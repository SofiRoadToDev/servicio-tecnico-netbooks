# Plan de Pruebas para Sistema de Servicio Técnico de Netbooks

## Resumen del Sistema
- **Tecnología**: Laravel 12 + React (Inertia.js) + Pest/PHPUnit
- **Funcionalidades**: Gestión de alumnos, equipos y servicios técnicos
- **Base de datos**: SQLite en memoria para testing

## Plan de Pruebas Automatizadas

### 1. Tests Unitarios
**Modelos**:
- Validaciones de campos (`Alumno`, `Equipo`, `ServicioTecnico`)
- Relaciones entre modelos
- Métodos de búsqueda (ej: buscar alumno por DNI)

### 2. Tests de Funcionalidad (Feature)
**Gestión de Alumnos**:
- Crear alumno con datos válidos
- Validar campos requeridos y límites de caracteres
- Listar alumnos con paginación
- Buscar alumno por DNI (API endpoint)

**Gestión de Equipos**:
- Crear equipo con datos válidos
- Validar campos obligatorios
- Listar equipos con paginación

**Servicio Técnico**:
- Crear servicio técnico vinculando alumno y equipo
- Filtrar servicios por DNI de alumno
- Listado con relaciones (alumno + equipo)

### 3. Tests de Integración Web
**Navegación**:
- Acceso a rutas principales
- Funcionamiento de sidebar
- Respuestas Inertia correctas

**Autenticación**:
- Login/logout
- Acceso a rutas protegidas

### 4. Tests de API
- Endpoint `/alumnos/buscar/{dni}`
- Respuestas JSON correctas
- Códigos de estado HTTP

### 5. Configuración para Google Jules
- Tests ejecutables con `composer test`
- Base de datos en memoria (SQLite)
- Coverage reports
- Integración con GitHub Actions

## Comandos de Ejecución
```bash
# Tests completos
composer test

# Tests específicos
php artisan test --filter=AlumnoTest
php artisan test --coverage
```

## Criterios de Aceptación para Producción
- ✅ Todos los tests pasan
- ✅ Coverage mínimo del 80%
- ✅ No errores de lint/estilo
- ✅ Validaciones de datos funcionando
- ✅ Relaciones de base de datos correctas