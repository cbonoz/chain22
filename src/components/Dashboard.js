import React, {useState, useEffect} from 'react'
import { Button, Empty, Modal, Spin } from 'antd'
import { getCaptchas } from '../util/moral'
import Captcha from './Captcha'
import { captchaUrl, isEmpty } from '../util'
import { useNavigate } from 'react-router'

export default function Dashboard({address}) {
    const [results, setResults] = useState()
    const [loading ,setLoading] = useState(false)
    const [preview, setPreview] = useState(undefined) // Set to preview captcha modal if set.

    const navigate = useNavigate()

    const clear = () => setPreview(undefined)

    async function fetchCaptchas() {
        setLoading(true)
        try {
            const r = await getCaptchas(0, 100);
            setResults(r)
        } catch (e) {
            console.error('error fetching', e)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        fetchCaptchas()
    }, [])

    if (loading) {
        return <div className='container'>
            <Spin size="large"/>
        </div>
    }

    const emptyResults = isEmpty(results)

  return (
    <div className='container'>
        {emptyResults && <Empty description="No Captchas found">
           <Button type="primary" onClick={() => navigate('/create')} >Create Captcha</Button>
            </Empty>}
        {!emptyResults && (results || []).map((r, i) => {
        return <div key={i}>
            {/* TODO: custom render */}
            {JSON.stringify(r)}
            <a href="#" onClick={(e) => {
                e.preventDefault()
                setPreview(r)
            }}>Live Preview</a>
        </div>})}

        < Modal visible={preview} onCancel={clear} onOk={clear}>
            {preview && <div>
                <iframe src={captchaUrl(preview.address)}/>
            </div>}
        </Modal>

    </div>
  )
}
