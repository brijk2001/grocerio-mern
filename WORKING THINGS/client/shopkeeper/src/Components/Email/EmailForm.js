import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';

const EmailForm = ({ condition, recipientEmail }) => {
    useEffect(() => {
        if (condition) {
            sendEmail('template_yfrwrh8', recipientEmail);
        } else {
            sendEmail('template_rzfjecv', recipientEmail);
        }
    }, [condition]);

    const sendEmail = (templateId, toEmail) => {
        // Your EmailJS service ID
        const serviceId = 'service_4lg1xqt';
        // Your EmailJS user ID
        const userId = 'ulW4POnZO57TsZpFl';

        // Send email
        const emailParams = {
            to_email: toEmail
        };
        emailjs.send(serviceId, templateId, emailParams, userId)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Email sending failed:', error.text);
            });
    };

    return null;
};

export default EmailForm;
