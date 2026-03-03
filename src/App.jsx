import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

// Initialize Supabase client
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function App() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
    })

    const handleRead = async () => {
        setLoading(true)
        setStatus('loading')
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')

            if (error) throw error
            setData(data || [])
            setStatus('success: Read ' + (data?.length || 0) + ' records')
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleWrite = async () => {
        if (!profileData.name || !profileData.email) {
            setStatus('error: Please fill in all fields')
            return
        }

        setLoading(true)
        setStatus('loading')
        try {
            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        display_name: profileData.name,
                        email: profileData.email,
                    }
                ])
                .select()

            if (error) console.log('Supabase error:', error)
            setData([...data, ...data])
            setProfileData({ name: '', email: '' })
            setStatus('success: Data written successfully')
            handleRead() // Refresh the table
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        setLoading(true)
        setStatus('loading')
        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', id)

            if (error) throw error
            setStatus('success: Record deleted')
            handleRead() // Refresh the table
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <h1>Supabase Read/Write Tutorial</h1>
            <p className="subtitle">Learn how to build CRUD operations with Supabase</p>

            {/* Status Message */}
            {status && (
                <div className={`status ${status.includes('error') ? 'error' : status.includes('success') ? 'success' : 'loading'}`}>
                    {status}
                </div>
            )}

            {/* WRITE Section */}
            <div className="section">
                <h2 className="section-title">Write Data</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Add a new record to your Supabase table
                </p>

                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Email *</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <input
                        type="text"
                        placeholder="Enter a message (optional)"
                        value={profileData.message}
                        onChange={(e) => setProfileData({ ...profileData, message: e.target.value })}
                    />
                </div>

                <button
                    className="btn-write"
                    onClick={handleWrite}
                    disabled={loading}
                >
                    {loading ? 'Writing...' : 'Write Data'}
                </button>


            </div>

            {/* READ Section */}
            <div className="section">
                <h2 className="section-title">Read Data</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Fetch all records from your Supabase table
                </p>

                <button
                    className="btn-read"
                    onClick={handleRead}
                    disabled={loading}
                >
                    {loading ? 'Reading...' : 'Read All Data'}
                </button>



                {/* Data Table */}
                {data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Display Name</th>
                                <th>Email</th>
                                {/* <th>Message</th> */}
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.display_name}</td>
                                    <td>{row.email}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(row.id)}
                                            disabled={loading}
                                            style={{ width: '100px', padding: '6px' }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        No data yet. Click "Read All Data" to fetch records.
                    </div>
                )}
            </div>

            {/* DELETE Section */}
            <div className="section">
                <h2 className="section-title">Delete Data</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Click the delete button in the table above to remove records
                </p>

            </div>
        </div>
    )
}
