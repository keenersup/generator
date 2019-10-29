import { useState, useEffect } from 'react';

export const useGetHeight = (props) => {
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    let isSubscribed = true
    const handleResize = () => {
      if (isSubscribed) {
        setHeight(window.innerHeight);
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      isSubscribed = false
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { height }
}

