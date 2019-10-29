import { useState } from 'react';
import Fingerprint2 from 'fingerprintjs2'

/********* ********* ********* ********* ********* ********* ********* ********* *********
 Fingerprint asynchronous function
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
export const getFingerprint = () => {
  if (window.requestIdleCallback) {
    return new Promise((resolve, reject) => {
      requestIdleCallback(function () {
        Fingerprint2.get((components) => {
          const murmur = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
          }).join(), 31)
          resolve(murmur)
        })
      })
    })
  } else {
    setTimeout(function () {
      return new Promise((resolve) => {
        Fingerprint2.get((components) => {
          const murmur = Fingerprint2.x64hash128(components.map(function (pair) {
            return pair.value
          }).join(), 31)
          resolve(murmur)
        })
      })
    }, 500)
  }
}


export const useGenerateFingerprint = ({ clientToken, resetValues }) => {
  const [clientId, setClientId] = useState('')
  getFingerprint().then(result => {
    /********* ********* ********* ********* ********* ********* ********* ********* *********
     compare clientToken and new clientId
     ********* ********* ********* ********* ********* ********* ********* ********* *********/
    if (result !== clientToken) {
      resetValues()
    }
    setClientId(result)
  });
  return { clientId }
}



