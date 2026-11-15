// ============================================
// POWER FIT STUDIO - JavaScript Completo
// ============================================

// Datos de ejemplo
const productos = [
    { nombre: 'Top Deportivo', precio: 25000, emoji: '👙' },
    { nombre: 'Short Deportivo', precio: 22000, emoji: '🩳' },
    { nombre: 'Buzo Fitness', precio: 45000, emoji: '🧥' },
    { nombre: 'Calza Fit', precio: 35000, emoji: '👖' }
];

const planes = [
    { nombre: 'Plan Básico', precio: 15000, duracion: 1, descripcion: 'Acceso al gimnasio en horario completo' },
    { nombre: 'Plan Premium', precio: 25000, duracion: 3, descripcion: 'Gimnasio + rutinas personalizadas' },
    { nombre: 'Plan Full', precio: 40000, duracion: 6, descripcion: 'Todo incluido + nutrición + tienda' }
];

const ejercicios = [
    { nombre: 'Sentadilla', grupo: 'Piernas', descripcion: 'Ejercicio compuesto para cuádriceps y glúteos' },
    { nombre: 'Press de banca', grupo: 'Pecho', descripcion: 'Ejercicio para pectorales y tríceps' },
    { nombre: 'Dominadas', grupo: 'Espalda', descripcion: 'Trabajo de dorsales y bíceps' },
    { nombre: 'Plancha', grupo: 'Core', descripcion: 'Fortalecimiento del abdomen' },
    { nombre: 'Peso muerto', grupo: 'Espalda', descripcion: 'Ejercicio compuesto para toda la cadena posterior' }
];

// Esperar a que cargue la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ JavaScript cargado');
    
    // Cargar datos
    mostrarProductos(productos);
    mostrarPlanes();
    mostrarEjercicios();
    
    // Menú lateral
    const botonesMenu = document.querySelectorAll('.nav-menu a');
    botonesMenu.forEach(function(boton) {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.getAttribute('data-seccion');
            irASeccion(seccion);
        });
    });
    
    // Botón "Ver más" de la tienda
    const btnVerMas = document.getElementById('btn-ver-mas-tienda');
    if (btnVerMas) {
        btnVerMas.addEventListener('click', function() {
            irASeccion('tienda');
        });
    }
    
    // Botón "Comenzar ahora"
    const btnComenzar = document.getElementById('btn-comenzar');
    if (btnComenzar) {
        btnComenzar.addEventListener('click', function() {
            abrirModalGenerico('🚀 ¡Bienvenida a Power Fit Studio!', 'Elegí el plan que mejor se adapte a tus objetivos y comenzá tu transformación hoy mismo.', function() {
                cerrarModal('modal-generico');
                irASeccion('planes');
            });
        });
    }
    
    // Botón "Tu mejor versión está más cerca"
    const btnMejorVersion = document.getElementById('btn-mejor-version');
    if (btnMejorVersion) {
        btnMejorVersion.addEventListener('click', function() {
            abrirModalGenerico('💪 ¡Vos podés!', 'Cada entrenamiento te acerca más a tu objetivo. Seguimos juntos en este camino.', function() {
                cerrarModal('modal-generico');
                irASeccion('progreso');
            });
        });
    }
    
    // Botón "Ver mi planificación"
    const btnPlanificacion = document.getElementById('btn-planificacion');
    if (btnPlanificacion) {
        btnPlanificacion.addEventListener('click', function() {
            abrirModal('modal-planificacion');
        });
    }
    
    // Botón de notificaciones
    const btnNotificaciones = document.getElementById('btn-notificaciones');
    if (btnNotificaciones) {
        btnNotificaciones.addEventListener('click', function() {
            abrirModal('modal-notificaciones');
        });
    }
    
    // Botón de perfil (la P redonda)
    const btnPerfil = document.getElementById('btn-perfil');
    if (btnPerfil) {
        btnPerfil.addEventListener('click', function() {
            abrirModal('modal-perfil');
        });
    }
    
    // Cerrar modales con la X
    const botonesCerrar = document.querySelectorAll('.modal-cerrar');
    botonesCerrar.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            cerrarModal(modalId);
        });
    });
    
    // Cerrar modal al hacer clic fuera
    const modales = document.querySelectorAll('.modal');
    modales.forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal(this.id);
            }
        });
    });
    
    // Formulario de inscripción a plan
    const formInscripcion = document.getElementById('form-inscripcion');
    if (formInscripcion) {
        formInscripcion.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('insc-nombre').value;
            const email = document.getElementById('insc-email').value;
            const plan = document.getElementById('plan-seleccionado').textContent;
            
            // Acá se guardaría en la base de datos (Supabase)
            console.log('📝 Inscripción registrada:', { nombre: nombre, email: email, plan: plan });
            
            cerrarModal('modal-inscripcion');
            mostrarExito('✅ ¡Inscripción confirmada! Bienvenida, ' + nombre);
            formInscripcion.reset();
        });
    }
    
    // Formulario de contacto
    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('contacto-nombre').value;
            
            console.log('📧 Mensaje enviado por:', nombre);
            
            mostrarExito('✅ ¡Mensaje enviado! Te responderemos pronto, ' + nombre);
            formContacto.reset();
        });
    }
    
    // Buscador (busca en productos, planes Y ejercicios)
    const buscador = document.getElementById('buscador');
    if (buscador) {
        buscador.addEventListener('input', function() {
            const texto = this.value.toLowerCase().trim();
            
            if (texto === '') {
                mostrarProductos(productos);
                return;
            }
            
            // Buscar en productos
            const productosFiltrados = productos.filter(function(p) {
                return p.nombre.toLowerCase().includes(texto);
            });
            
            // Buscar en planes
            const planesFiltrados = planes.filter(function(p) {
                return p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
            });
            
            // Buscar en ejercicios
            const ejerciciosFiltrados = ejercicios.filter(function(e) {
                return e.nombre.toLowerCase().includes(texto) || e.grupo.toLowerCase().includes(texto);
            });
            
            const total = productosFiltrados.length + planesFiltrados.length + ejerciciosFiltrados.length;
            
            if (total === 0) {
                // No hay resultados
                const html = '<p style="grid-column:1/-1; text-align:center; color:#888; padding:20px;">No se encontraron resultados para "' + texto + '"</p>';
                document.getElementById('contenedor-productos').innerHTML = html;
                document.getElementById('contenedor-productos-full').innerHTML = html;
                return;
            }
            
            // Armar HTML combinado
            let html = '';
            
            if (productosFiltrados.length > 0) {
                html += '<h3 style="grid-column:1/-1; color:#ff1493; margin-top:10px;">👕 Productos (' + productosFiltrados.length + ')</h3>';
                productosFiltrados.forEach(function(prod) {
                    html += '<div class="producto-card">';
                    html += '<div class="producto-img">' + prod.emoji + '</div>';
                    html += '<div class="producto-info">';
                    html += '<h4>' + prod.nombre + '</h4>';
                    html += '<p class="precio">$' + prod.precio.toLocaleString() + '</p>';
                    html += '</div></div>';
                });
            }
            
            if (planesFiltrados.length > 0) {
                html += '<h3 style="grid-column:1/-1; color:#ff1493; margin-top:20px;">👑 Planes (' + planesFiltrados.length + ')</h3>';
                planesFiltrados.forEach(function(plan) {
                    html += '<div class="plan-card">';
                    html += '<h3>' + plan.nombre + '</h3>';
                    html += '<p class="precio">$' + plan.precio.toLocaleString() + '</p>';
                    html += '<p>' + plan.descripcion + '</p>';
                    html += '<p><strong>Duración:</strong> ' + plan.duracion + ' meses</p>';
                    html += '</div>';
                });
            }
            
            if (ejerciciosFiltrados.length > 0) {
                html += '<h3 style="grid-column:1/-1; color:#ff1493; margin-top:20px;">💪 Ejercicios (' + ejerciciosFiltrados.length + ')</h3>';
                const iconos = { 'Piernas': '🦵', 'Pecho': '💪', 'Espalda': '🔙', 'Core': '🎯' };
                ejerciciosFiltrados.forEach(function(ej) {
                    const icono = iconos[ej.grupo] || '💪';
                    html += '<div class="rutina-card">';
                    html += '<h4>' + icono + ' ' + ej.nombre + '</h4>';
                    html += '<p style="color:#888; font-size:13px;">' + ej.grupo + '</p>';
                    html += '<p style="font-size:13px;">' + ej.descripcion + '</p>';
                    html += '</div>';
                });
            }
            
            document.getElementById('contenedor-productos-full').innerHTML = html;
            document.getElementById('contenedor-productos').innerHTML = html;
            irASeccion('tienda');
        });
    }
});

// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================
function irASeccion(nombre) {
    const botones = document.querySelectorAll('.nav-menu a');
    botones.forEach(function(b) { b.classList.remove('active'); });
    
    const botonActivo = document.querySelector('.nav-menu a[data-seccion="' + nombre + '"]');
    if (botonActivo) { botonActivo.classList.add('active'); }
    
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(function(s) { s.classList.remove('activa'); });
    
    const seccionMostrar = document.getElementById('seccion-' + nombre);
    if (seccionMostrar) {
        seccionMostrar.classList.add('activa');
        window.scrollTo(0, 0);
        console.log('📍 Sección: ' + nombre);
    }
}

// ============================================
// FUNCIONES DE MODALES
// ============================================
function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.add('activo'); }
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.remove('activo'); }
}

function abrirModalGenerico(titulo, texto, callback) {
    document.getElementById('modal-generico-titulo').textContent = titulo;
    document.getElementById('modal-generico-texto').textContent = texto;
    
    const btn = document.getElementById('modal-generico-btn');
    btn.onclick = function() {
        if (callback) callback();
    };
    
    abrirModal('modal-generico');
}

function abrirModalInscripcion(nombrePlan) {
    document.getElementById('plan-seleccionado').textContent = 'Plan seleccionado: ' + nombrePlan;
    abrirModal('modal-inscripcion');
}

// ============================================
// MENSAJE DE ÉXITO
// ============================================
function mostrarExito(texto) {
    const mensaje = document.getElementById('mensaje-exito');
    document.getElementById('mensaje-exito-texto').textContent = texto;
    mensaje.classList.add('activo');
    
    setTimeout(function() {
        mensaje.classList.remove('activo');
    }, 3500);
}

// ============================================
// MOSTRAR DATOS
// ============================================
function mostrarProductos(listaProductos) {
    const contenedor1 = document.getElementById('contenedor-productos');
    const contenedor2 = document.getElementById('contenedor-productos-full');
    
    let html = '';
    listaProductos.forEach(function(prod) {
        html += '<div class="producto-card">';
        html += '<div class="producto-img">' + prod.emoji + '</div>';
        html += '<div class="producto-info">';
        html += '<h4>' + prod.nombre + '</h4>';
        html += '<p class="precio">$' + prod.precio.toLocaleString() + '</p>';
        html += '</div></div>';
    });
    
    if (contenedor1) contenedor1.innerHTML = html;
    if (contenedor2) contenedor2.innerHTML = html;
}

function mostrarPlanes() {
    const contenedor = document.getElementById('contenedor-planes');
    if (!contenedor) return;
    
    let html = '';
    planes.forEach(function(plan) {
        html += '<div class="plan-card">';
        html += '<h3>' + plan.nombre + '</h3>';
        html += '<p class="precio">$' + plan.precio.toLocaleString() + '</p>';
        html += '<p>' + plan.descripcion + '</p>';
        html += '<p><strong>Duración:</strong> ' + plan.duracion + ' meses</p>';
        html += '<button class="btn-plan btn-inscribirme" data-plan="' + plan.nombre + '">Inscribirme</button>';
        html += '</div>';
    });
    
    contenedor.innerHTML = html;
    
    // Conectar los botones de inscripción
    const botonesInscribirme = contenedor.querySelectorAll('.btn-inscribirme');
    botonesInscribirme.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const nombrePlan = this.getAttribute('data-plan');
            abrirModalInscripcion(nombrePlan);
        });
    });
}

function mostrarEjercicios() {
    const contenedor = document.getElementById('contenedor-ejercicios');
    if (!contenedor) return;
    
    const iconos = { 'Piernas': '🦵', 'Pecho': '💪', 'Espalda': '🔙', 'Core': '🎯' };
    
    let html = '';
    ejercicios.forEach(function(ej) {
        const icono = iconos[ej.grupo] || '💪';
        html += '<div class="rutina-card">';
        html += '<h4>' + icono + ' ' + ej.nombre + '</h4>';
        html += '<p style="color:#888; font-size:13px; margin-bottom:10px">' + ej.grupo + '</p>';
        html += '<p style="font-size:13px">' + ej.descripcion + '</p>';
        html += '</div>';
    });
    
    contenedor.innerHTML = html;
}