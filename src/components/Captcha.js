import { Button, Input, Spin } from 'antd'
import React, {useState, useEffect} from 'react'
import { checkResult } from '../contract/deploy'
import { getCaptcha, initMoralis } from '../util/moral'

// Embeddable route used for rendering the current captcha.
export default function Captcha({
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
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !data) {
    return <Spin/>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <div>Enter last ethereum price within $100.</div>
      <Input prefix='$' onChange={e => setValue(e.target.value)} value={value}/>
      <br/>
      <br/>

      Enter keyword corresponding to the image <a target="_blank" href={data.imageUrl}>here</a>.
      <Input prefix='Keyword:' onChange={e => setKeyword(e.target.value)} value={keyword}/>

      <Button className='standard-btn' type="primary" disabled={loading} onClick={validate}>Validate</Button>
    </div>
  )
}
