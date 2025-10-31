# Notas de Implementación - Adopciones Frontend

## Funcionalidades Implementadas

### 1. Separación de Animales por Tipo
- ✅ Creadas páginas específicas para perros (`/dogs`) y gatos (`/cats`)
- ✅ Modificado el componente `FilterBar` para ocultar el filtro de tipo cuando sea necesario
- ✅ Actualizados los botones del Hero para redirigir a las páginas específicas

### 2. Secciones Dinámicas del Home
- ✅ Creado sistema completo para gestionar secciones del home desde la base de datos
- ✅ Componente `HomeSections` que muestra hasta 4 secciones con título, imagen y contenido
- ✅ Integrado en la página principal debajo de la sección "About"

### 3. Sistema de Donaciones
- ✅ Implementado botón para donaciones monetarias con MercadoPago
- ✅ Modal para registrar donaciones en especie con formulario completo
- ✅ Tipos de donación: Petshop, Venta de garage, Artículos de limpieza, Medicación, Alimento, Otros

### 4. Panel de Administración
- ✅ Sección para gestionar secciones del home en el panel admin
- ✅ Formulario para crear/editar secciones con título, contenido, imagen y orden
- ✅ Lista de secciones existentes con opciones para editar/eliminar
- ✅ Sistema de tabs para separar gestión de animales y secciones

## Configuración Requerida

### MercadoPago
Para configurar las donaciones con MercadoPago, necesitas:

1. **Obtener tu Preference ID de MercadoPago**
2. **Actualizar la URL en `src/app/components/DonationSection.tsx`**:
   ```typescript
   // Línea 8 - Reemplazar con tu link real de MercadoPago
   const mercadoPagoUrl = "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=TU_PREFERENCE_ID";
   ```

### Endpoints de API Requeridos

El frontend espera los siguientes endpoints en el backend:

#### Secciones del Home
- `GET /sections?limit=4&offset=0` - Obtener secciones para mostrar en el home (máximo 4)
- `GET /sections` - Obtener todas las secciones (para admin) - Respuesta paginada
- `GET /sections/:id` - Obtener sección por ID
- `POST /sections` - Crear nueva sección (soporta hasta 10 imágenes con multipart/form-data)
- `PATCH /sections/:id` - Actualizar sección (soporta multipart/form-data para imágenes)
- `DELETE /sections/:id` - Eliminar sección

**Notas importantes**:
1. **Paginación**: Los endpoints GET que retornan múltiples secciones usan:
```json
{
  "data": [...],
  "total": number,
  "limit": number,
  "offset": number
}
```

2. **Creación con imágenes**: El POST retorna:
```json
{
  "success": true,
  "data": { ... }
}
```

3. **Imágenes múltiples**: 
   - Campo FormData: `images` (no `image`)
   - Máximo 10 archivos por sección
   - Procesadas automáticamente a WebP
   - Guardadas en `/uploads/sections/{sectionId}/`

#### Donaciones
- `POST /donations` - Crear nueva donación
- `GET /donations` - Obtener todas las donaciones (para admin)
- `GET /donations/:id` - Obtener donación por ID

### Estructura de Datos

#### HomeSection
```typescript
interface HomeSection {
    id: number;
    title: string;
    description: string; // Puede contener HTML básico
    images: string[]; // Array de URLs de imágenes
    createdAt?: string;
    updatedAt?: string;
}
```

#### Donation
```typescript
interface Donation {
    id: number;
    firstName: string;
    lastName: string;
    contact: string; // teléfono o email
    donationType: 'PETSHOP' | 'GARAGE_SALE' | 'CLEANING_SUPPLIES' | 'MEDICATION' | 'FOOD' | 'OTHER';
    description: string;
    createdAt?: string;
}
```

## Archivos Creados/Modificados

### Nuevos Archivos
- `src/app/dogs/page.tsx` - Página de perros
- `src/app/cats/page.tsx` - Página de gatos
- `src/app/types/section.ts` - Tipos para secciones
- `src/app/types/donation.ts` - Tipos para donaciones
- `src/services/sections.ts` - Servicio para API de secciones
- `src/services/donations.ts` - Servicio para API de donaciones
- `src/hooks/useSections.ts` - Hooks para secciones
- `src/hooks/useCreateSection.ts` - Hooks para mutaciones de secciones
- `src/app/components/HomeSections.tsx` - Componente de secciones del home
- `src/app/components/DonationModal.tsx` - Modal de donaciones
- `src/app/components/DonationSection.tsx` - Sección de donaciones
- `src/app/admin/Components/CreateSectionForm.tsx` - Formulario de secciones
- `src/app/admin/Components/SectionsManager.tsx` - Gestor de secciones

### Archivos Modificados
- `src/app/components/FilterBar.tsx` - Agregado prop para ocultar filtro de tipo
- `src/app/components/Hero.tsx` - Actualizados links a páginas específicas
- `src/app/page.tsx` - Agregadas secciones dinámicas y donaciones
- `src/app/admin/page.tsx` - Agregado panel de gestión de secciones

## Próximos Pasos

1. **Implementar los endpoints del backend** según las especificaciones
2. **Configurar MercadoPago** y actualizar la URL de donaciones
3. **Probar todas las funcionalidades** con datos reales
4. **Ajustar estilos** si es necesario según el diseño final

## Notas Técnicas

- Todas las imágenes se manejan como `multipart/form-data`
- El contenido de las secciones puede incluir HTML básico
- Las secciones se ordenan por el campo `order`
- Solo se muestran las primeras 4 secciones activas en el home
- El sistema de donaciones incluye validación completa del formulario
