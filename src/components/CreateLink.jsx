"use client"

import { useState, useEffect } from 'react';

export default function CreateLink() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [linkToDelete, setLinkToDelete] = useState(null);
    const [linkToEdit, setLinkToEdit] = useState(null);

    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            const response = await fetch('/api/links');

            if(!response.ok) {
                console.log(response);
                return;
            }

            const data = await response.json();

            setLinks(data);
            console.log(data);
        }

        fetchLinks();
    }, [])


    const [fullUrl, setFullUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const body = JSON.stringify({
            fullUrl,
            name
        });

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        })

        if(response.status === 201) {
            setSuccess('Link created successfully')
            setError('')
            setName('')
            setFullUrl('')
            setTimeout(() => {
                setSuccess('')
            }, 5000)

            const data = await response.json();
            setLinks([...links, data.url]);

        } else {
            const { message } = await response.json();
            setSuccess('')
            setError(message)
            setTimeout(() => {
                setError('')
            }, 5000)

        }
    }

    const [editError, setEditError] = useState('');

    const handleEditClick = (link) => {
        setEditError('');
        setLinkToEdit(link);
        setShowEditModal(true);
    }

    const handleConfirmDelete = async () => {
        const response = await fetch(`/api/delete/${linkToDelete._id}`, {
            method: 'DELETE'
        });

        if(response.status === 200) {
            setLinks(links.filter(link => link._id !== linkToDelete._id));
            setShowDeleteModal(false);

            setSuccess('Link deleted successfully');
            setError('');
            setTimeout(() => {
                setSuccess('');
            }, 5000)
        } else {
            const { message } = await response.json();
            setSuccess('');
            setError(message);
            setTimeout(() => {
                setError('');
            }, 5000)
        }
    }

    const handleDeleteClick = (link) => {
        setLinkToDelete(link);
        setShowDeleteModal(true);
    }

    const handleSaveEdit = async () => {
        if(!linkToEdit.name || !linkToEdit.fullUrl) {
            setEditError('Name and Full URL are required');
            return;
        }

        const body = JSON.stringify({
            name: linkToEdit.name,
            enabled: linkToEdit.enabled,
            fullUrl: linkToEdit.fullUrl,
        });

        const response = await fetch(`/api/edit/${linkToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        if(response.status === 200) {
            setShowEditModal(false);
            setSuccess('Link updated successfully');
            setError('');
            setTimeout(() => {
                setSuccess('');
            }, 5000)

            setLinks(links.map(link => link._id === linkToEdit._id ? linkToEdit : link));
        } else {
            const { message } = await response.json();
            setSuccess('');
            setEditError(message);
        }        
    }


    return (
        <>
            <form className="mt-10 grid md:grid-cols-4 grid-cols-1">
                <input placeholder="Enter your Full URL" type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 col-span-2' value={fullUrl} onChange={(e) => setFullUrl(e.target.value)}/>
                <input type="text" placeholder="Entry Name" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700' value={name} onChange={(e) => setName(e.target.value)}/>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Link</button>
            </form>
            
            <p className='py-4 text-red-600 text-center text-lg font-semibold'>{error} &#8205; </p>
            <p className='py-4 text-green-600 text-center text-lg font-semibold'>{success} &#8205;</p>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                    <th className='text-left font-bold text-2xl pr-4'>Name</th>
                    <th className="text-left font-bold text-2xl" style={{width: 40 + '%'}}>Full URL</th>
                    <th className='text-left font-bold text-2xl pr-4'>Clicks</th>
                    <th className='text-left font-bold text-2xl pr-4'>Short</th>
                    <th className='text-left font-bold text-2xl pr-4'>Active</th>
                    <th className='text-left font-bold text-2xl' style={{width: 20 + '%'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((link) => (
                        <tr key={link._id}>
                            <td>{link.name}</td>
                            <td><a href={link.fullUrl} className='text-blue-600'>{link.fullUrl}</a></td>
                            <td>{link.clicks}</td>
                            <td><a href={link.shortUrl} className='text-blue-600'>{link.shortUrl}</a></td>
                            <td>{link.enabled ? <span className='text-green-600'>Yes</span> : <span className='text-red-600'>No</span>}</td>
                            <td><button className='font-bold text-blue-500' onClick={() => handleEditClick(link)}>Edit</button> <button className='text-red-600 font-bold' onClick={() => handleDeleteClick(link)}>Delete</button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            

            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete the link <span className='font-bold'>"{linkToDelete?.name}"</span>?</p>
                        <p>This action is irreversible and you'll lose your URL</p>
                        <div className="mt-4">
                            <button onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Delete
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Link</h2>
                        <p className='text-red-600 font-bold'>{editError}</p>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2" 
                                value={linkToEdit?.name || ''} 
                                onChange={(e) => setLinkToEdit({ ...linkToEdit, name: e.target.value })}
                                placeholder="Link Name"
                            />
                            <div className="flex items-center mb-4">
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={linkToEdit?.enabled || false}
                                    onChange={(e) => setLinkToEdit({ ...linkToEdit, enabled: e.target.checked })}
                                />
                                <span>Active</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2" 
                                value={linkToEdit?.fullUrl || ''} 
                                onChange={(e) => setLinkToEdit({ ...linkToEdit, fullUrl: e.target.value })}
                                placeholder="Full URL"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                type="text" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2" 
                                value={linkToEdit?.shortUrl || ''} 
                                disabled
                                placeholder="Short URL"
                            />
                        </div>
                        <div className="mt-4">
                            <button onClick={() => {
                                handleSaveEdit();
                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Save
                            </button>
                            <button onClick={() => setShowEditModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
    
};
