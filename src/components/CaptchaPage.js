import React from 'react'
import { useParams } from 'react-router'
import Captcha from './Captcha'
import logo from '../assets/logo.png'

// Embeddable route used for rendering the current captchaPage.
export default function CaptchaPage({address}) {
    const {captchaId} = useParams()

  return (
    <div>
      <Captcha captchaId={captchaId}/>
    </div>
  )
}
