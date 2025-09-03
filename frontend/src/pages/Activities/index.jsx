import React, { useEffect, useState } from 'react';
import API from '../../helpers/api';

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const loadGrants = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/activities`);
            console.log("res", res);
            setActivities(res?.data);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGrants();
    }, []);

    return (
        <div>
            <h3>Activities</h3>
            <form className="mb-4">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </form>

            <table className="table">
                <thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>
                    {activities.map(activity => (
                        <tr key={activity.id}>
                            <td>{activity.title}</td>
                            <td>{activity.description}</td>
                            <td>
                                <button className="btn btn-sm btn-warning mr-2" >Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Activities;