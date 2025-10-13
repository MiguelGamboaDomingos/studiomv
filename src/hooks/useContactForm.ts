import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { ContactForm, ValidationError, FormState } from '../types';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

interface UseContactFormReturn {
  formState: FormState<ContactFormData>;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<boolean>;
  resetForm: () => void;
}

// EmailJS configuration - these should be environment variables in production
const EMAILJS_CONFIG = {
  serviceId: 'service_mvstudio', // Replace with your EmailJS service ID
  templateId: 'template_contact', // Replace with your EmailJS template ID
  publicKey: 'your_public_key', // Replace with your EmailJS public key
};

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
  return phoneRegex.test(phone);
};

const validateForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Nome é obrigatório' });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Nome deve ter pelo menos 2 caracteres' });
  }

  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email é obrigatório' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  if (!data.projectType.trim()) {
    errors.push({ field: 'projectType', message: 'Tipo de projeto é obrigatório' });
  }

  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Mensagem é obrigatória' });
  } else if (data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Mensagem deve ter pelo menos 10 caracteres' });
  }

  // Optional field validation
  if (data.phone && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Número de telefone inválido' });
  }

  return errors;
};

export const useContactForm = (): UseContactFormReturn => {
  const [formState, setFormState] = useState<FormState<ContactFormData>>({
    data: initialFormData,
    errors: [],
    isSubmitting: false,
    isValid: false,
  });

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormState(prev => {
      const newData = { ...prev.data, [field]: value };
      const errors = validateForm(newData);
      
      return {
        ...prev,
        data: newData,
        errors,
        isValid: errors.length === 0,
      };
    });
  }, []);

  const submitForm = useCallback(async (): Promise<boolean> => {
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      // Validate form
      const errors = validateForm(formState.data);
      if (errors.length > 0) {
        setFormState(prev => ({
          ...prev,
          errors,
          isSubmitting: false,
          isValid: false,
        }));
        return false;
      }

      // Prepare email template parameters
      const templateParams = {
        from_name: formState.data.name,
        from_email: formState.data.email,
        phone: formState.data.phone || 'Não fornecido',
        company: formState.data.company || 'Não fornecido',
        project_type: formState.data.projectType,
        budget: formState.data.budget || 'Não especificado',
        message: formState.data.message,
        to_name: 'MV Studio',
        reply_to: formState.data.email,
      };

      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      if (response.status === 200) {
        // Success - reset form
        setFormState({
          data: initialFormData,
          errors: [],
          isSubmitting: false,
          isValid: false,
        });
        return true;
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      
      // For development, we'll simulate success to test the UI
      // In production, this should handle the actual error
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Simulating successful email send');
        setFormState({
          data: initialFormData,
          errors: [],
          isSubmitting: false,
          isValid: false,
        });
        return true;
      }

      setFormState(prev => ({
        ...prev,
        errors: [{ field: 'general', message: 'Erro ao enviar mensagem. Tente novamente.' }],
        isSubmitting: false,
      }));
      return false;
    }
  }, [formState.data]);

  const resetForm = useCallback(() => {
    setFormState({
      data: initialFormData,
      errors: [],
      isSubmitting: false,
      isValid: false,
    });
  }, []);

  return {
    formState,
    updateField,
    submitForm,
    resetForm,
  };
};

// Utility function to get error message for a specific field
export const getFieldError = (errors: ValidationError[], field: string): string | undefined => {
  return errors.find(error => error.field === field)?.message;
};

// Utility function to check if a field has an error
export const hasFieldError = (errors: ValidationError[], field: string): boolean => {
  return errors.some(error => error.field === field);
};

// Project type options for the form
export const PROJECT_TYPES = [
  { value: 'corporate', label: 'Vídeo Corporativo' },
  { value: 'wedding', label: 'Casamento' },
  { value: 'event', label: 'Evento' },
  { value: 'fashion', label: 'Moda' },
  { value: 'documentary', label: 'Documentário' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'music-video', label: 'Videoclipe' },
  { value: 'photography', label: 'Fotografia' },
  { value: 'other', label: 'Outro' },
];

// Budget options for the form
export const BUDGET_OPTIONS = [
  { value: 'under-1000', label: 'Menos de €1.000' },
  { value: '1000-2500', label: '€1.000 - €2.500' },
  { value: '2500-5000', label: '€2.500 - €5.000' },
  { value: '5000-10000', label: '€5.000 - €10.000' },
  { value: 'over-10000', label: 'Mais de €10.000' },
  { value: 'discuss', label: 'Prefiro discutir' },
];
