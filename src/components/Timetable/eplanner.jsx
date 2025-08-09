import React, { useState, useEffect } from "react";

import EplannerAPI from "./eplannerAPI";


const styles = {
    crd: {
        border: "1px solid #2b273b",
        margin: "10px 5px 10px 5px",
        padding:"15px 25px 15px 25px",
        borderRadius: "8px",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        backgroundColor:"#1b1728"
    }
}

const PersonalCard = () => {
    // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [weekdays, setWeekdays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);
    
    // Data state
    const [personalItems, setPersonalItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //  GET - Fetch data from backend
    const fetchPersonalData = async () => {
        try {
            setLoading(true);
            console.log("Fetching personal data...");
            
            const data = await EplannerAPI.getPersonals();
            setPersonalItems(data);
            console.log(" Fetched data:", data);
            
        } catch (err) {
            console.error(" Error fetching data:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        if (isOpen) {
            fetchPersonalData();
        }
    }, [isOpen]);

   
  const savePersonalData = async () => {
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    try {
      setLoading(true);
      console.log(" Saving personal data...");

      const newItem = {
        title: title.trim(),
        description: description.trim(),
        date: date || null,
        weekdays: weekdays || '',
        startdate: startDate || null,
        enddate: endDate || null,
        location: location || null
      };

      console.log(" Data being sent:", newItem);
      const savedItem = await EplannerAPI.createPersonal(newItem);
      console.log(" Saved data:", savedItem);

      setPersonalItems([...personalItems, savedItem]);

      setTitle('');
      setDescription('');
      setDate('');
      setWeekdays('');
      setStartDate('');
      setEndDate('');
      setLocation('');

    } catch (err) {
      console.error(" Error saving data:", err);
      console.error(" Full error details:", err.message, err.stack);
      // alert("Failed to save task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Clear form data and delete all tasks
  const removePersonalData = async() => {
    try {
      setLoading(true);
      console.log("Deleting all personal data...");
      
      const result = await EplannerAPI.deletePersonalall();
      console.log("Deleted all data:", result);
      
      // Clear local state
      setPersonalItems([]);
      
      // Clear form fields
      setTitle('');
      setDescription('');
      setDate('');
      setWeekdays('');
      setStartDate('');
      setEndDate('');
      setLocation('');
      
      alert(`Successfully deleted all tasks!`);
      
    } catch (err) {
      console.error("Error deleting all data:", err);
      alert("Failed to delete all tasks. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Delete individual task
  const deletePersonalItem = async (itemId) => {

    try {
      setLoading(true);
      console.log(" Deleting personal data...");

      await EplannerAPI.deletePersonal(itemId);
      console.log(" Deleted data with ID:", itemId);

      
      setPersonalItems(personalItems.filter(item => item.id !== itemId));

    } catch (err) {
      console.error(" Error deleting data:", err);
      // alert("Failed to delete task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

    const toggleplanner = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setError(''); 
        }
    }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleWeekdaysChange = (e) => {
    setWeekdays(e.target.value);
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

    return (
        <div>
          <button 
            type="button" 
            onClick={toggleplanner} 
            style={{ 
              position: 'fixed',
              bottom: '85%',
              right: '17%',
              zIndex: 9999,
              backgroundColor: '#1b1728',
              color: 'white',
              padding: '15px 25px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
            disabled={loading}
          >
              E-P {loading && ''}
          </button>
          
          {isOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 10000
            }}>
              <div style={{
                ...styles.crd,
                maxWidth: '600px',
                width: '90%',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative'
              }}>
                <button 
                  type="button"
                  style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    background: 'none', 
                    border: 'none', 
                    fontSize: '20px', 
                    cursor: 'pointer',
                    color: '#333'
                  }}
                  onClick={toggleplanner}
                >
                  ✕
                </button>
                
                <h2 style={{ marginBottom: '0px', color: 'white' }}> Personal Planner</h2>
                
                {error && (
                  <div style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    border: '1px solid #f5c6cb',
                    borderRadius: '4px',
                    padding: '10px',
                    marginBottom: '15px'
                  }}>
                     {error}
                  </div>
                )}
                
              
                <div style={{ 
                  backgroundColor: '#1b1728', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #1b1728'
                }}>
                  <h3 style={{ marginBottom: '15px', color: 'white' }}>Add New Task</h3>

                  <div style={{ marginBottom: '15px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="eplanner-title" style={{ marginBottom: '5px', color: 'white' , display: 'flex'}}>
                       Title 
                    </label>
                    <input
                      id="eplanner-title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter task title..."
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #201f2e',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: "#201f2e",
                        color: 'white'
                      }}
                      disabled={loading}
                      required
                    />
                  </div>
                {/* Date */}
                 <div style={{ marginBottom: '15px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="eplanner-date" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                       Date
                    </label>
                    <input
                      id="eplanner-date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #201f2e',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: "#201f2e",
                        color: 'white',
                      }}
                      disabled={loading}
                    />
                  </div>
                  {/* Weekdays */}
                  <div style={{ marginBottom: '15px', marginRight: '400px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <select
                      id="eplanner-weekdays"
                      name="weekdays"
                      value={weekdays}
                      placeholder="Does not repeat"
                      onChange={handleWeekdaysChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        margin: '0px 50px 0px 0px',
                        left: '50%',
                        border: '2px solid #201f2e',
                        borderRadius: '4px',
                        fontSize: '16px',
                        backgroundColor: "#201f2e",
                        color: 'white',
                      }}
                      disabled={loading}
                    >
                      {/* <option value="">Select weekdays</option> */}
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  {/* Start and End Date */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                      <div style={{ marginBottom: '15px' }}>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="eplanner-startdate" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                          Start Date
                            </label>
                            <input
                              id="eplanner-startdate"
                              name="startdate"
                              type="date"
                              value={startDate}
                              onChange={handleStartDateChange}
                              style={{
                                width: '100%',
                                padding: '10px',
                                border: '2px solid #201f2e',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                                backgroundColor: "#201f2e",
                                color: 'white',
                              }}
                              disabled={loading}
                            />
                          </div>
    
                          <p style={{ alignSelf: 'center', color: 'white', fontSize: '18px', margin: '30px 68px 30px 68px' }}> to </p>
    
                          <div style={{ marginBottom: '15px' }}>
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label htmlFor="eplanner-enddate" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                              End Date
                            </label>
                            <input
                              id="eplanner-enddate"
                              name="enddate"
                              type="date"
                              value={endDate}
                              onChange={handleEndDateChange}
                              style={{
                                width: '100%',
                                padding: '10px',
                                border: '2px solid #201f2e',
                                borderRadius: '4px',
                                fontSize: '16px',
                                boxSizing: 'border-box',
                                backgroundColor: "#201f2e",
                                color: 'white',
                              }}
                              disabled={loading}
                            />
                          </div>
                      </div>
                  {/* Location */}
                  <div style={{ marginBottom: '15px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="eplanner-location" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                      Location
                    </label>
                    <input
                      id="eplanner-location"
                      name="location"
                      type="text"
                      value={location}
                      onChange={handleLocationChange}
                      placeholder="Enter location..."
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #201f2e',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: "#201f2e",
                        color: 'white',
                      }}
                      disabled={loading}
                    />
                  </div>
                  {/* Description */}
                  <div style={{ marginBottom: '15px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="eplanner-description" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                       Description
                    </label>
                    <textarea
                      id="eplanner-description"
                      name="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter description..."
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #201f2e',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        backgroundColor: "#201f2e",
                        color: 'white'
                      }}
                      disabled={loading}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' , alignItems: 'center',  marginLeft:'250px'}}>
                    <button
                      type="button"
                      onClick={savePersonalData}
                      disabled={loading}
                      style={{
                        backgroundColor: '#8080FF',
                        color: 'white',
                        padding: '12px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        margin:'0 10px 0 0px',
                        filter:'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))'
                      }}
                    >
                      {loading ? ' Saving...' : ' Save Task'}
                    </button>
                    <button type="button" onClick={removePersonalData} style={{
                      backgroundColor: '#1b1728',
                      color: 'red',
                      padding: '12px 20px',
                      border: '1px solid red',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      margin:'0 0 0 0px',
                      filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))'
                    }}>
                       Remove
                    </button>

                  </div>
                </div>
                
                
                <div>
                  <h3 style={{ color: 'white' , margin:'0px 60px 0px 20px'}}> Your Tasks ({personalItems.length})</h3>
                  
                  {loading && (
                    <div style={{ textAlign: 'center', padding: '0px'}}>
                      <p> Loading tasks...</p>
                    </div>
                  )}
                  
                  {!loading && personalItems.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '30px',
                      backgroundColor: '#1b1728',
                      borderRadius: '8px',
                      border: '2px dashed #ced4da'
                    }}>
                      <p style={{ fontSize: '48px', margin: '10px 0' }}>X</p>
                      <p style={{ color: '#6c757d', margin: '0' }}>No tasks yet. Add your first task above!</p>
                    </div>
                  )}
                  
                  {!loading && personalItems.length > 0 && (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {personalItems.map((item, index) => (
                        <div key={item.id || index} style={{
                          backgroundColor: '#1b1728',
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          padding: '15px',
                          marginBottom: '10px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          position: 'relative'
                        }}>
                          <button
                            type="button"
                            onClick={() => deletePersonalItem(item.id)}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#ff6b6b',
                              fontSize: '16px',
                              cursor: 'pointer',
                              padding: '5px',
                              borderRadius: '3px'
                            }}
                            title="Delete task"
                          >
                            X
                          </button>
                          
                          <h4 style={{ margin: '0 0 10px 0', color: 'white', paddingRight: '30px' }}>
                             {item.title}
                          </h4>

                          {item.description && (
                            <p style={{ margin: '0 0 10px 0', color: 'white' }}>
                              {item.description}
                            </p>
                          )}

                          {item.date && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '0px 0px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              marginRight: '8px'
                            }}>
                              Date: {item.date}
                            </div>
                          )}
                          {item.weekdays && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              marginRight: '8px'
                            }}>
                              Weekdays: {item.weekdays}
                            </div>
                          )}
                          {item.startdate && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              marginRight: '8px'
                            }}>
                              Start: {item.startdate}
                            </div>
                          )}
                          {item.enddate && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              End: {item.enddate}
                            </div>
                          )}
                          {item.location && (
                            <div style={{
                              marginTop: '10px',
                              color: 'white'
                            }}>
                              <strong>Location:</strong> {item.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
    )
}

const PersonalPlanner = () => {
    
    return (
        <PersonalCard  />
    )
}

export default PersonalPlanner;