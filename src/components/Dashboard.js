import React, {useState, useEffect} from 'react'
import { Button, Empty, Modal, Spin, Table } from 'antd'
import { getCaptchas, transfer } from '../util/moral'
import { captchaUrl, isEmpty } from '../util'
import { useNavigate } from 'react-router'
import Input from 'antd/lib/input/Input'
import { ACTIVE_CHAIN_ID } from '../util/constants'
import Captcha from './Captcha'
import logo from '../assets/logo.png'

export default function Dashboard({address}) {
    const [searchValue, setSearchValue] = useState()
    const [results, setResults] = useState()
    const [allResults, setAllResults] = useState()
    const [searchResult, setSearchResults] = useState()
    const [loading ,setLoading] = useState(true)
    const [preview, setPreview] = useState(undefined) // Set to preview captcha modal if set.

    const navigate = useNavigate()

    const clear = () => setPreview(undefined)

    useEffect(() => {
        if (!address) {
            navigate('/')
        }

    }, [address])

    async function fetchCaptchas() {
        setLoading(true)
        try {
            const r = await getCaptchas(address, 0, 100);
            console.log('fetch', r)
            setResults(r)
            setAllResults(r)
        } catch (e) {
            console.error('error fetching', e)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(() => {
        setTimeout(fetchCaptchas, 500)
    }, [address])

    useEffect(() => {
        console.log('search', searchValue)
        if (searchValue) {
            setResults(allResults.filter(x => (x.name.toLowerCase()).indexOf(searchValue.toLowerCase()) !== -1))
        } else {
            setResults(allResults)
        }

        // TODO: search by matching name substring.
    }, [searchValue])

    if (loading) {
        return <div className='container'>
            <Spin size="large"/>
        </div>
    }

    const emptyResults = isEmpty(results)

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Address',
          dataIndex: 'contractUrl',
          key: 'address',
          render: url => <div>
                <a href={url} target="_blank">View Contract</a>
          </div>
        },
        {
          title: 'Keyword',
          dataIndex: 'keyword',
          key: 'keyword'
        },
        {
            title: 'image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: url => <div>
                  <a href={url} target="_blank">View Image</a>
            </div>
          },
        {
            title: 'Preview',
            render: r => <div>
            <a href="#" onClick={(e) => {
                e.preventDefault()
                setPreview(r)
            }}>Live Preview</a>
            </div>
          },
          {
            title: 'Fund Contract',
            key: 'funded',
            render: r => <div>
              <Button type="primary" onClick={(e) => {
                //   e.preventDefault()
                  transfer("0.5", r.address, ACTIVE_CHAIN_ID.linkAddress)
              }}>Fund 0.5 Link</Button>
            </div>
          },
        ]

  return (
    <div className='container'>
        <h1>Your Active Captchas</h1>
        <hr/>
        <Input className='standard-input' placeholder='Enter the name of your Captcha' prefix="Search:" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <br/>
        <br/>
        <br/>
        {emptyResults && <Empty description="No Captchas found">
           <Button type="primary" onClick={() => navigate('/create')} >Create Captcha</Button>
            </Empty>}
        {!emptyResults && <div>
            <Table columns={columns} dataSource={results} />

        </div>}

        < Modal footer={null} visible={preview}  onCancel={clear}>
            {preview && <div>
                {/* <p>The section below is intended to be iframed in. If the verification is successful,
                    a message will be posted back to your parent app (via <pre>window.postMessage</pre>) and you can respond accordingly.
                </p> */}

                <Captcha captchaId={preview.address}/>
                {/* <iframe src={captchaUrl(preview.address)}/> */}
            </div>}
        </Modal>

    </div>
  )
}
