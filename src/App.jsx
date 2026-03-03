import { useState } from 'react'

// TODO: Initialize Supabase client
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// )

export default function App() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    // TODO: Implement READ function
    const handleRead = async () => {
        setLoading(true)
        setStatus('loading')
        try {
            // Your read code goes here
            // Example placeholder:
            // const { data, error } = await supabase
            //   .from('your_table_name')
            //   .select('*')
            // 
            // if (error) throw error
            // setData(data || [])
            // setStatus('success: Read ' + (data?.length || 0) + ' records')

            setStatus('❌ Read function not yet implemented - add your code above!')
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // TODO: Implement WRITE function
    const handleWrite = async () => {
        if (!formData.name || !formData.email) {
            setStatus('error: Please fill in all fields')
            return
        }

        setLoading(true)
        setStatus('loading')
        try {
            // Your write code goes here
            // Example placeholder:
            // const { data, error } = await supabase
            //   .from('your_table_name')
            //   .insert([
            //     {
            //       name: formData.name,
            //       email: formData.email,
            //       message: formData.message
            //     }
            //   ])
            //   .select()
            // 
            // if (error) throw error
            // setData([...data, ...data])
            // setFormData({ name: '', email: '', message: '' })
            // setStatus('success: Data written successfully')
            // handleRead() // Refresh the table

            setStatus('❌ Write function not yet implemented - add your code above!')
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // TODO: Implement DELETE function
    const handleDelete = async (id) => {
        setLoading(true)
        setStatus('loading')
        try {
            // Your delete code goes here
            // Example placeholder:
            // const { error } = await supabase
            //   .from('your_table_name')
            //   .delete()
            //   .eq('id', id)
            // 
            // if (error) throw error
            // setStatus('success: Record deleted')
            // handleRead() // Refresh the table

            setStatus('❌ Delete function not yet implemented - add your code above!')
        } catch (error) {
            setStatus('error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <h1>📊 Supabase Read/Write Tutorial</h1>
            <p className="subtitle">Learn how to build CRUD operations with Supabase</p>

            {/* Status Message */}
            {status && (
                <div className={`status ${status.includes('❌') || status.includes('error') ? 'error' : status.includes('✅') || status.includes('success') ? 'success' : 'loading'}`}>
                    {status}
                </div>
            )}

            {/* WRITE Section */}
            <div className="section">
                <h2 className="section-title">✍️ Write Data</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Add a new record to your Supabase table
                </p>

                <div className="form-group">
                    <label>Name *</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Email *</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <input
                        type="text"
                        placeholder="Enter a message (optional)"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <button
                    className="btn-write"
                    onClick={handleWrite}
                    disabled={loading}
                >
                    {loading ? 'Writing...' : 'Write Data'}
                </button>

                <div className="code-block">
                    <pre>{`// Step 1: Make sure your Supabase client is initialized
// Step 2: Replace 'your_table_name' with your actual table
// Step 3: Write code here to INSERT data into Supabase`}</pre>
                </div>
            </div>

            {/* READ Section */}
            <div className="section">
                <h2 className="section-title">📖 Read Data</h2>
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

                <div className="code-block">
                    <pre>{`// Step 1: Make sure your Supabase client is initialized
// Step 2: Replace 'your_table_name' with your actual table
// Step 3: Write code here to SELECT data from Supabase`}</pre>
                </div>

                {/* Data Table */}
                {data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.message}</td>
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
                        📭 No data yet. Click "Read All Data" to fetch records.
                    </div>
                )}
            </div>

            {/* DELETE Section */}
            <div className="section">
                <h2 className="section-title">🗑️ Delete Data</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Click the delete button in the table above to remove records
                </p>

                <div className="code-block">
                    <pre>{`// Step 1: Make sure your Supabase client is initialized
// Step 2: Replace 'your_table_name' with your actual table
// Step 3: Write code here to DELETE data from Supabase`}</pre>
                </div>
            </div>
        </div>
    )
}
