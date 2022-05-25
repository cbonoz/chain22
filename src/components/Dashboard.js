import React, {useState, useEffect} from 'react'
import { Button, Empty, Modal, Spin } from 'antd'
import { getCaptchas } from '../util/moral'
import { captchaUrl, isEmpty } from '../util'
import { useNavigate } from 'react-router'
import Input from 'antd/lib/input/Input'

export default function Dashboard({address}) {
    const [searchValue, setSearchValue] = useState()
    const [results, setResults] = useState()
    const [searchResult, setSearchResults] = useState()
    const [loading ,setLoading] = useState(false)
    const [preview, setPreview] = useState(undefined) // Set to preview captcha modal if set.

    const navigate = useNavigate()

    const clear = () => setPreview(undefined)

    async function fetchCaptchas() {
        setLoading(true)
        try {
            const r = await getCaptchas(address, 0, 100);
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

    useEffect(() => {
        console.log('search', searchValue)
        // TODO: search by matching name substring.
    }, [searchValue])

    if (loading) {
        return <div className='container'>
            <Spin size="large"/>
        </div>
    }

    const emptyResults = isEmpty(results)

  return (
    <div className='container'>
        <Input prefix="Search by name:" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
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
                <p>The section below is intended to be iframed in. If the verification is successful,
                    a message will be posted back to your parent app (via <pre>window.postMessage</pre>) and you can respond accordingly.
                </p>
                <iframe src={captchaUrl(preview.address)}/>
            </div>}
        </Modal>

    </div>
  )
}
