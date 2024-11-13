import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Download, Send, MessageCircle } from 'lucide-react';
import profileImg from './img/11.jpeg';
import portfolio1 from './img/portfolio1.png';
import portfolio3 from './img/portfolio3.png';
import portfolio4 from './img/portfolio4.png';
import portfolio5 from './img/sistemaUsuarios.JPG';
import portfolio6 from './img/odontologiaProyecto.JPG';
import CV from './img/cv.pdf';
import ContactForm from './components/ContactForm';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hola: false,
    nombre: false,
    dev: false,
    bttn: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Improved intersection observer with React
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.id;
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [targetId]: true
            }));
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    ['hola', 'nombre', 'dev', 'bttn'].forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your email logic here using a modern email service
    alert('Form submission functionality needs to be implemented');
  };

  const portfolioProjects = [
    {
      title: "Sitio Web Estático",
      description: "Sitio web desarrollado con HTML & CSS, implementando diseño responsive y mejores prácticas de desarrollo web. Proyecto final del curso en CoderHouse.",
      image: portfolio1,
      link: "https://maurodepascali.github.io/Nonna-Julia/"
    },
    {
      title: "E-commerce con JavaScript",
      description: "Aplicación web de e-commerce desarrollada con JavaScript vanilla, incluyendo carrito de compras funcional y gestión de estados. Proyecto del curso en CoderHouse.",
      image: portfolio3,
      link: "https://maurodepascali.github.io/CarritoDeCompra/"
    },
    {
      title: "E-commerce React",
      description: "Versión mejorada del e-commerce utilizando React.js, implementando componentes reutilizables, gestión de estados y hooks. Proyecto final de React en CoderHouse.",
      image: portfolio4,
      link: "https://maurodepascali.github.io/CarritoDeCompra/"
    },
    {
      title: "Sistema de Gestión de Usuarios",
      description: "Aplicación web CRUD desarrollada con React y Firebase. Permite crear, leer, actualizar y eliminar usuarios con almacenamiento en tiempo real. Incluye funcionalidad de búsqueda y exportación de datos.",
      image: portfolio5,
      link: "https://maurodepascali.github.io/crud-firebase/"
    },
    {
      title: "Sistema de Presupuestos Odontológicos",
      description: "Aplicación web especializada para profesionales odontológicos. Permite generar presupuestos detallados, gestionar tratamientos y exportar a PDF. Integrada con Firebase para persistencia de datos en tiempo real.",
      image: portfolio6,
      link: "https://maurodepascali.github.io/presupuesto-odontologico/"
    }
  ];

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Mauro De Pascali.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" />
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isNavSticky ? 'bg-[#162d41]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="text-4xl font-bold text-[#6c7afa]">
              M <span className="text-[#acb9fc]">P</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#portfolios" className="text-white hover:text-[#acb9fc] transition-colors">Portfolios</a>
              <a href="#contact" className="text-white hover:text-[#acb9fc] transition-colors">Contacto</a>
              <button 
                onClick={handleDownloadCV}
                className="px-4 py-2 bg-[#0a141d] text-white rounded-md hover:bg-[#183249] transition-colors"
              >
                <Download className="inline-block mr-2 w-4 h-4" />
                Descargá mi CV
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile menu */}
{isMenuOpen && (
  <div className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-[#162d41] z-50">
    {/* Logo y botón cerrar */}
    <div className="flex justify-between items-center px-4 py-5">
      <a href="#" className="text-4xl font-bold text-[#6c7afa]">
        M <span className="text-[#acb9fc]">P</span>
      </a>
      <button 
        onClick={() => setIsMenuOpen(false)}
        className="text-white hover:text-[#6c7afa] transition-colors"
      >
        <X size={24} />
      </button>
    </div>

    {/* Links del menú */}
    <div className="flex flex-col items-center justify-center h-[calc(100%-80px)] gap-6">
      <a 
        href="#portfolios" 
        className="w-full max-w-xs py-3 text-white hover:bg-[#0a141d] rounded-md transition-colors text-center"
        onClick={() => setIsMenuOpen(false)}
      >
        Portfolios
      </a>
      <a 
        href="#contact" 
        className="w-full max-w-xs py-3 text-white hover:bg-[#0a141d] rounded-md transition-colors text-center"
        onClick={() => setIsMenuOpen(false)}
      >
        Contacto
      </a>
      <button 
        onClick={() => {
          handleDownloadCV();
          setIsMenuOpen(false);
        }}
        className="w-full max-w-xs py-3 bg-[#0a141d] text-white rounded-md hover:bg-[#183249] transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Descargá mi CV
      </button>
    </div>
  </div>
)}
        </div>
      </nav>

      <header className="h-[85vh] md:h-[70vh] relative overflow-hidden bg-gradient-to-b from-[#0a1a2a] to-[#162d41]">
  <div className="h-full flex items-center justify-center px-4">
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl">
      {/* Contenedor de la imagen en círculo */}
      <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#acb9fc]/20 shrink-0 shadow-xl">
        <img 
          src={profileImg}
          alt="Mauro De Pascali"
          className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Contenedor del texto */}
      <div className="text-white text-center md:text-left">
        <h2 id="hola" 
          className={`text-lg sm:text-xl md:text-2xl mb-2 transition-all duration-700 ${
            isVisible.hola ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          ¡Bienvenido! Soy
        </h2>
        <h1 id="nombre" 
          className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
            isVisible.nombre ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Mauro De Pascali
        </h1>
        <div id="dev" 
          className={`space-y-2 mb-6 transition-all duration-700 ${
            isVisible.dev ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-[#6c7afa]">
            Desarrollador web Frontend
          </p>
          <p className="text-base sm:text-lg md:text-xl">
            Técnico en programación
          </p>
        </div>
        <button 
          onClick={scrollToContact}
          id="bttn"
          className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 bg-[#0a141d] text-white rounded-md hover:bg-[#183249] transition-all duration-700 ${
            isVisible.bttn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Contactame
        </button>
      </div>
    </div>
  </div>

  {/* Círculos decorativos sutiles - ocultos en móvil */}
  <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6c7afa]/3 blur-3xl" />
  <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6c7afa]/3 blur-3xl" />
</header>

      {/* Portfolio Section */}
      <section id="portfolios" className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Mis portfolios</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#6c7afa] hover:text-[#acb9fc]"
                >
                  Ver proyecto →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <div className="fixed right-4 bottom-4 space-y-4 z-40">
        <a 
          href="https://api.whatsapp.com/send?phone=541121579513" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
        >
          <MessageCircle size={24} />
        </a>
        <a href="https://www.linkedin.com/in/mauro-de-pascali-4a327b74/" 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex items-center justify-center w-12 h-12 bg-[#0077b5] text-white rounded-full shadow-lg hover:bg-[#00669c] transition-colors">
          <Linkedin />
        </a>
        <a href="https://github.com/maurodepascali" 
           target="_blank" 
           rel="noopener noreferrer"
           className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors">
          <Github />
        </a>
      </div>

      <ContactForm />

      {/* Footer */}
      <footer className="bg-[#0a1a2a] text-white py-4 text-center">
        <p>© {new Date().getFullYear()} Mauro De Pascali. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;