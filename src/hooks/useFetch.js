import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Custom hook untuk fetch data dari API
 * @param {string} url - URL endpoint
 * @returns {object} - { data, loading, error, refetch }
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skip if no URL provided
    if (!url) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch data')
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  // Function untuk refetch data
  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(url)
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}
