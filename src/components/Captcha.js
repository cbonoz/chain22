import React from 'react'
import { useParams } from 'react-router'

// Embeddable route used for rendering the current captcha.
export default function Captcha() {
    const {captchaId} = useParams()

    console.log('captchaId', captchaId)
  return (
    <div>
        TODO: Captcha {captchaId}
    </div>
  )
}
