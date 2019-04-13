import React, { useState, useEffect } from "react";
import { defaultReq, defaultPostParams } from "../src/lib/defaults.js";
import "./App.css";

const App = () => {
	const [data, setData] = useState({ reqs: [] });
	const [message, setMessage] = useState("");
	const [formData, setFormData] = useState(defaultReq);

	useEffect(() => {
		fetch("/reqs")
			.then(response => response.json())
			.then(data => setData({ reqs: data.data }));
	}, [data]);

	const handleChange = e => {
		let form = { ...formData };
		form[e.target.name] = e.target.value;
		setFormData(form);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (!formData.title) {
			setMessage("A title is required.");
			return;
		}
		postReq(formData);
	};

	const postReq = formData => {
		fetch("/reqs", {
			...defaultPostParams,
			body: JSON.stringify(formData) // body data type must match "Content-Type" header
		})
			.then(response => response.json())
			.then(responsedata => {
				setData({ reqs: [...data.reqs, responsedata.data] });
				setMessage(data.message);
			}); // parses JSON response into native Javascript objects
	};

	return (
		<>
			<fieldset>
				<textarea
					name="title"
					onChange={handleChange}
					value={formData.title}
					placeholder="Title"
				/>
				<textarea
					name="equipment"
					onChange={handleChange}
					value={formData.equipment}
					placeholder="Equipment"
				/>
				<textarea
					name="notes"
					onChange={handleChange}
					value={formData.notes}
					placeholder="Notes"
				/>
				<button onClick={handleSubmit} type="submit">
					Submit
				</button>
			</fieldset>
			<div className="App">
				<header className="App-header">
					<ul>
						{/* {console.log(data)} */}
						{data.reqs.map(req => (
							<li key={req._id}>
								<div>{req.title}</div>
							</li>
						))}
					</ul>
					<p>{message}</p>
				</header>
			</div>
		</>
	);
};

export default App;
