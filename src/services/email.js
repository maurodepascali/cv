import emailjs from '@emailjs/browser';

emailjs.init('odpIAqn_9GptjPWUi');

export const sendEmail = async (templateParams) => {
  try {
    const result = await emailjs.send(
      'service_kd8mj18',
      'template_fsqsxby',
      templateParams
    );
    return result;
  } catch (error) {
    throw error;
  }
};