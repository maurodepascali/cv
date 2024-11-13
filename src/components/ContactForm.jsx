import React, { useState } from 'react';
import { sendEmail } from '../services/email';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    consulta: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Agregado el estado isSubmitting

  // Agregada la función handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando mensaje...');

    try {
      const templateParams = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        consulta: formData.consulta
      };

      await sendEmail(templateParams);
      
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        consulta: ''
      });

      toast.success('¡Mensaje enviado con éxito!', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: '#0a1a2a',
          color: '#fff'
        }
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al enviar el mensaje', {
        id: loadingToast,
        duration: 4000,
        style: {
          background: '#DC2626',
          color: '#fff'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">CONTACTAME</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#6c7afa]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-Mail"
              required
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#6c7afa]"
            />
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              required
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#6c7afa]"
            />
            <textarea
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              placeholder="Mensaje"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6c7afa]"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-[#0a1a2a] text-white rounded-full hover:bg-[#162d41] transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;