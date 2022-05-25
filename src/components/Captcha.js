import { Button, Input, Spin } from 'antd'
import React, {useState, useEffect} from 'react'
import { checkResult, loadValue } from '../contract/deploy'
import { getCaptcha, initMoralis } from '../util/moral'
import logo from '../assets/logo.png'


// Embeddable route used for rendering the current captcha.
export default function Captcha({
  showHeader=true,
  captchaId, // Identifier for the captcha (typically contract address).
  onSuccess=() => {
    alert('Success')
  }, // callback for success submissions
  onFailure=(e) => {
    console.error('e', e)
    alert('Failure')
  } // callback for failure submissions.
}) {

  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState()
  const [keyword, setKeyword] = useState()
  const [data, setData] = useState({})
  const [error ,setError] = useState()

  async function fetch() {
    console.log('fetch', captchaId)
    if (!captchaId) {
      setError('Invalid Captcha ID')
      return
    }
    setError(undefined)

    try {
      const res = await getCaptcha(captchaId)
      setData(res)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    initMoralis()
    fetch()
  }, [captchaId])

  async function validate() {
    setError(undefined)
    setLoading(true)
    try {
      const res = await checkResult(captchaId, value, keyword);
      onSuccess()
    } catch (e) {
      onFailure(e)
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !data) {
    return <Spin/>
  }


  const isFormFilled = keyword && value

  return (
    <div>
      {showHeader && <div><img src={logo} className='captcha-header'/></div>}
      <p><i>Captcha Preview</i></p>
      <p>Embed the `Captcha` component below on your website</p>
      <div className='captcha-preview'>
      <div>
        Enter the last ethereum price in USD within $100&nbsp;
        (<a href="#" onClick={e => {
          e.preventDefault()
          loadValue(captchaId); // Captcha ID (address)
        }}>Update Price</a>)
      </div>
      <Input prefix='$' onChange={e => setValue(e.target.value)} value={value}/>
      <br/>
      <br/>

      Enter keyword corresponding to the image <a target="_blank" href={data.imageUrl}>here</a>.
      <Input prefix='Keyword:' onChange={e => setKeyword(e.target.value)} value={keyword}/>
      <Button className='standard-btn' type="primary" disabled={loading || !isFormFilled} onClick={validate}>Validate</Button>
      {error && <p className='error-text'>Error: {error.substr(0, 50)}...</p>}
</div>
    </div>
  )
}
