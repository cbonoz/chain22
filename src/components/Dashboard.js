import React, {useState, useEffect} from 'react'
import { Empty, Spin } from 'antd'
import { getCaptchas } from '../util/moral'

export default function Dashboard({address}) {
    const [results, setResults] = useState()
    const [loading ,setLoading] = useState(false)

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

  return (
    <div className='container'>
        {!results && <Empty description="No Captchas found"/>}
        {results && results.map((r, i) => {
        return <div key={i}>
            {/* TODO: custom render */}
            {JSON.stringify(r)}
        </div>})}


    </div>
  )
}
