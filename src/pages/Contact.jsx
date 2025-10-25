import { useState } from 'react'

// Komponen Contact
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [notification, setNotification] = useState('')

  // Fungsi handleChange
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Fungsi handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi pengiriman
    console.log('Form submitted:', formData)
    
    // Tampilkan notifikasi
    setNotification('Form submitted!!!')
    
    // Bersihkan form
    setFormData({ name: '', email: '', message: '' })

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you.</p>
      
      {notification && (
        <div className="notification-banner">
          {notification}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-explore">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Contact
