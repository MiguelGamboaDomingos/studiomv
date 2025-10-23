# Sistema de Parallax Reutilizável - Guia Completo

## 📋 Visão Geral

Este sistema oferece uma solução completa e reutilizável para efeitos parallax em todas as páginas do site, com foco em performance, flexibilidade e facilidade de uso.

## 🏗️ Arquitetura

### Componentes Principais

1. **ParallaxProvider** - Contexto global que gerencia todos os elementos parallax
2. **useAdvancedParallax** - Hook principal com configurações avançadas
3. **ParallaxElement** - Componente de alto nível para uso direto
4. **Componentes Especializados** - Versões pré-configuradas para casos específicos

## 🚀 Configuração Inicial

### 1. Envolver a aplicação com o Provider

```tsx
import { ParallaxProvider } from './components/ParallaxProvider';

function App() {
  return (
    <ParallaxProvider globalSpeed={1} enabled={true}>
      {/* Sua aplicação */}
    </ParallaxProvider>
  );
}
```

### 2. Usar em qualquer componente

```tsx
import { ParallaxElement, ParallaxSection } from './components/ParallaxElement';

function MinhaSecao() {
  return (
    <ParallaxSection backgroundPattern="grid" backgroundSpeed={0.3}>
      <ParallaxElement preset="content">
        <h1>Meu Conteúdo</h1>
      </ParallaxElement>
    </ParallaxSection>
  );
}
```

## 🎛️ Presets Disponíveis

### `background` - Para fundos
- **Speed**: 0.3 (lento)
- **Uso**: Padrões de fundo, texturas
- **Easing**: linear

### `content` - Para conteúdo principal
- **Speed**: 0.5 (médio)
- **Uso**: Textos, cards, seções principais
- **Easing**: ease-out

### `foreground` - Para primeiro plano
- **Speed**: 0.8 (rápido)
- **Uso**: Elementos em destaque, CTAs
- **Easing**: ease-in-out

### `horizontal` - Para movimento lateral
- **Speed**: 0.4
- **Direção**: horizontal
- **Uso**: Elementos decorativos laterais

### `floating` - Para movimento flutuante
- **Speed**: 0.2
- **Direção**: both (vertical + horizontal)
- **Uso**: Elementos decorativos, ícones

### `subtle` - Para movimento sutil
- **Speed**: 0.1 (muito lento)
- **Uso**: Textos delicados, elementos sutis

## 📝 Exemplos de Uso

### Uso Básico

```tsx
// Parallax simples com preset
<ParallaxElement preset="content">
  <h1>Meu Título</h1>
</ParallaxElement>

// Parallax customizado
<ParallaxElement 
  preset="content" 
  speed={0.7} 
  easing="ease-in-out"
  offset={20}
>
  <div>Conteúdo customizado</div>
</ParallaxElement>
```

### Componentes Especializados

```tsx
// Background com parallax
<ParallaxBackground speed={0.2}>
  <div className="pattern-background" />
</ParallaxBackground>

// Conteúdo principal
<ParallaxContent>
  <h2>Título da Seção</h2>
  <p>Descrição...</p>
</ParallaxContent>

// Elemento em destaque
<ParallaxForeground>
  <button>Call to Action</button>
</ParallaxForeground>
```

### Seção Completa com Background Pattern

```tsx
<ParallaxSection
  backgroundPattern="grid"        // 'grid' | 'dots' | 'lines' | 'none'
  backgroundSpeed={0.3}
  contentSpeed={0.5}
  patternColor="rgba(201,169,97,0.1)"
  patternSize={100}
  className="py-32"
>
  <div className="container mx-auto">
    <h2>Minha Seção</h2>
    <p>Conteúdo da seção...</p>
  </div>
</ParallaxSection>
```

### Lista com Parallax Escalonado

```tsx
<ParallaxList
  staggerDelay={0.1}              // Incremento de velocidade entre itens
  preset="content"
  className="space-y-4"
  itemClassName="bg-gray-800 p-4 rounded"
>
  {items.map(item => (
    <div key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
</ParallaxList>
```

### Hook Avançado

```tsx
function MeuComponente() {
  const { elementRef, isRegistered, updateSettings } = useAdvancedParallax({
    preset: 'content',
    config: { speed: 0.6, easing: 'ease-out' }
  });

  // Atualizar configurações dinamicamente
  const handleSpeedChange = (newSpeed: number) => {
    updateSettings({ speed: newSpeed });
  };

  return (
    <div ref={elementRef}>
      Meu conteúdo com parallax
    </div>
  );
}
```

### Parallax com Trigger de Visibilidade

```tsx
function ComponenteComTrigger() {
  const { elementRef, isVisible, isAnimating } = useTriggeredParallax(
    'content',
    { threshold: 0.3 }  // Ativa quando 30% visível
  );

  return (
    <div ref={elementRef}>
      {isVisible && <p>Elemento visível!</p>}
      {isAnimating && <p>Parallax ativo!</p>}
    </div>
  );
}
```

## ⚡ Otimizações de Performance

### Automáticas
- **Throttling** de scroll events (16ms em dispositivos rápidos, 32ms em lentos)
- **will-change** aplicado apenas quando necessário
- **Intersection Observer** para detectar visibilidade
- **Adaptive Performance** baseado em FPS e capacidade do dispositivo
- **Reduced Motion** respeitado automaticamente

### Configurações Manuais

```tsx
// Desabilitar parallax em dispositivos lentos
<ParallaxProvider 
  globalSpeed={0.5}           // Reduzir velocidade global
  enabled={!isLowEndDevice}   // Desabilitar completamente
>
```

## 🎨 Integração com Páginas Existentes

### Substituir parallax existente

```tsx
// ANTES (parallax antigo)
const { transform } = useParallax(0.5);
<div style={{ transform }}>Conteúdo</div>

// DEPOIS (novo sistema)
<ParallaxContent speed={0.5}>
  Conteúdo
</ParallaxContent>
```

### Migração gradual

```tsx
// Manter compatibilidade durante migração
function MinhaSecao() {
  const useNewParallax = true; // Feature flag

  if (useNewParallax) {
    return (
      <ParallaxSection backgroundPattern="grid">
        <ParallaxContent>Novo sistema</ParallaxContent>
      </ParallaxSection>
    );
  }

  // Sistema antigo como fallback
  return <OldParallaxComponent />;
}
```

## 🔧 Configurações Avançadas

### Easing Customizado

```tsx
<ParallaxElement
  speed={0.5}
  easing="ease-in-out"    // 'linear' | 'ease-out' | 'ease-in-out'
  offset={50}             // Offset inicial
  threshold={200}         // Distância para ativação
/>
```

### Direções de Movimento

```tsx
// Vertical (padrão)
<ParallaxElement direction="vertical" />

// Horizontal
<ParallaxElement direction="horizontal" />

// Ambas as direções
<ParallaxElement direction="both" />
```

## 🐛 Debugging

### Logs de Performance

```tsx
// Ativar logs de debug
<ParallaxProvider debug={true}>
```

### Verificar Estado

```tsx
function DebugComponent() {
  const { globalConfig } = useAdvancedParallax();
  
  console.log('Parallax enabled:', globalConfig.enabled);
  console.log('Performance mode:', globalConfig.performanceMode);
  console.log('Reduced motion:', globalConfig.reducedMotion);
}
```

## 📱 Responsividade

```tsx
// Diferentes configurações por breakpoint
<ParallaxElement
  speed={window.innerWidth > 768 ? 0.5 : 0.2}  // Menos movimento em mobile
  disabled={window.innerWidth < 480}           // Desabilitar em telas pequenas
/>
```

## 🎯 Casos de Uso Recomendados

1. **Hero Sections** - Use `ParallaxSection` com background pattern
2. **Cards de Conteúdo** - Use `ParallaxContent` 
3. **Elementos Decorativos** - Use `ParallaxFloating` ou `ParallaxSubtle`
4. **Listas/Grids** - Use `ParallaxList` para efeito escalonado
5. **Backgrounds** - Use `ParallaxBackground` para padrões e texturas

Este sistema oferece máxima flexibilidade mantendo simplicidade de uso e performance otimizada! 🚀
