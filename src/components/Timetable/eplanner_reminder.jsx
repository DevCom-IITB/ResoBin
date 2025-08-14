import React, { useState, useEffect } from "react";

import EplannerAPI from "./eplannerAPI";


const styles = {
    crd: {
        border: "1px",
        margin: "10px 5px 10px 5px",
        padding:"15px 25px 15px 25px",
        borderRadius: "16px",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        backgroundColor:"#2b273b"
    }
}

const ReminderCard = ({ isEmbedded = false, hideButton = false }) => {
    // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [weekdays, setWeekdays] = useState('');
  const [starttime, setStarttime] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [isOpen, setIsOpen] = useState(isEmbedded);


    const [ReminderItems, setReminderItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Listen for custom event from dropdown
    useEffect(() => {
        const handleToggleEvent = () => {
            setIsOpen(!isOpen);
        };
        
        window.addEventListener('toggle-reminder-planner', handleToggleEvent);
        
        return () => {
            window.removeEventListener('toggle-reminder-planner', handleToggleEvent);
        };
    }, [isOpen]);


    const getTodayDateReadable = () => {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        };
        return today.toLocaleDateString('en-US', options);
    };

    const getWeekdayDisplay = (weekdayCode) => {
        const weekdayMap = {
            'mon': 'Monday',
            'tue': 'Tuesday', 
            'wed': 'Wednesday',
            'thu': 'Thursday',
            'fri': 'Friday',
            'sat': 'Saturday',
            'sun': 'Sunday',
            'Daily': 'Daily'
        };
        return weekdayMap[weekdayCode] || weekdayCode;
    };


    const fetchReminderData = async () => {
        try {
            setLoading(true);
            // console.log("Fetching personal data...");
            const data = await EplannerAPI.getReminders();
            setReminderItems(data);
            // console.log(" Fetched data:", data);

        } catch (err) {
            console.error(" Error fetching data:", err);
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        if (isOpen) {
            fetchReminderData();
        }
    }, [isOpen]);


  const saveReminderData = async () => {
    if (!title.trim()) {
      alert("Please enter a title!");
      return;
    }

    try {
      setLoading(true);
      // console.log(" Saving personal data...");

      const newItem = {
        title: title.trim(),
        description: description.trim(),
        date: date || null,
        weekdays: weekdays || '',
        starttime: isAllDay ? null : (starttime || null),
      };

      // console.log(" Data being sent:", newItem);
      const savedItem = await EplannerAPI.createReminder(newItem);
      // console.log(" Saved data:", savedItem);

      setReminderItems([...ReminderItems, savedItem]);

      // Notify timetable to refresh
      window.dispatchEvent(new CustomEvent('eplanner-updated'));

      setTitle('');
      setDescription('');
      setDate('');
      setWeekdays('');
      setStarttime('');
      setIsAllDay(false);
    } catch (err) {
      console.error(" Error saving data:", err);
      console.error(" Full error details:", err.message, err.stack);
      // alert("Failed to save task. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Clear form data and delete all tasks
  const removeReminderData = async() => {
    try {
      setLoading(true);
      // console.log("Deleting all reminder data...");

      const result = await EplannerAPI.deleteReminderall();
      // console.log("Deleted all data:", result);

      setReminderItems([]);

      // Notify timetable to refresh
      window.dispatchEvent(new CustomEvent('eplanner-updated'));

      
      setTitle('');
      setDescription('');
      setDate('');
      setWeekdays('');
      setStarttime('');
      setIsAllDay(false);
      
    } catch (err) {
      console.error("Error deleting all data:", err);
    } finally {
      setLoading(false);
    }
  };


  const deleteReminderItem = async (itemId) => {

    try {
      setLoading(true);
      // console.log(" Deleting reminder data...");

      await EplannerAPI.deleteReminder(itemId);
      // console.log(" Deleted data with ID:", itemId);

      setReminderItems(ReminderItems.filter(item => item.id !== itemId));

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

  const handleStarttimeChange = (e) => {
    setStarttime(e.target.value);
  }

  const handleAllDayChange = (e) => {
    setIsAllDay(e.target.checked);
    if (e.target.checked) {
      setStarttime(''); // Clear time when All Day is checked
    }
  }


    return (
        <div>
          {!hideButton && (
            <button 
              type="button" 
              onClick={toggleplanner} 
              style={{ 
                position: 'fixed',
                bottom: '40%',
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
                Reminder {loading && '...'}
            </button>
          )}
          
          {isOpen && (
            <div style={isEmbedded ? {} : {
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
                    color: '#9ca3af'
                  }}
                  onClick={toggleplanner}
                >
                  ✕
                </button>
                
                <h2 style={{ marginBottom: '0px', color: 'white' }}> Reminder</h2>
                
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
                  backgroundColor: '#2b273b', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px'
                }}>

                  <div style={{ marginBottom: '15px' }}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <input
                      id="eplanner-title"
                      name="title"
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Add title"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        backgroundColor: "#2b273b",
                        color: 'white',
                        borderBottom: '3px solid #4a4a5e',
                        margin: '0px 0'
                      }}
                      
                      disabled={loading}
                      required
                    />
                  </div>
                {/* Date */}
                <div style={{ marginBottom: '15px', display : 'flex', gap: '-5px'}}>
                  <div style={{ display : 'flex', width: '8%', marginTop:'15px'}}>
                    <svg 
                      width="25" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      style={{ marginRight: '10px' }}
                    >
                      <rect x="3" y="6" width="18" height="14" rx="2" ry="2" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                      <circle cx="8" cy="2" r="1" fill="#9ca3af"/>
                      <circle cx="16" cy="2" r="1" fill="#9ca3af"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke="#9ca3af" strokeWidth="2"/>
                      <circle cx="7" cy="13" r="0.5" fill="#9ca3af" opacity="0.6"/>
                      <circle cx="12" cy="13" r="0.5" fill="#9ca3af" opacity="0.6"/>
                      <circle cx="17" cy="13" r="0.5" fill="#9ca3af" opacity="0.6"/>
                    </svg>
                  </div>
                  <div 
                    role="button"
                    tabIndex={0}
                    style={{
                          width: '100%',
                          border: '1px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          // boxSizing: 'border-box',
                          backgroundColor: "#1b1728",
                          color: date ? 'white' : 'transparent',
                          outline: 'none',
                          padding: '10px',
                          marginTop:'10px',
                          marginRight:'13px',
                          position: 'relative',
                          flex:'1',
                          cursor: 'pointer'
                        }}
                    onClick={() => document.getElementById('eplanner-date').showPicker()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        document.getElementById('eplanner-date').showPicker();
                      }
                    }}
                  >
                    {/* Show today's date text when no date is selected */}
                    {!date && (
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#9ca3af',
                        fontSize: '16px',
                        pointerEvents: 'none'
                      }}>
                        {getTodayDateReadable()}
                      </span>
                    )}
                    
                    <input
                      id="eplanner-date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={handleDateChange}
                      disabled={loading}
                      style={{
                        backgroundColor: "#1b1728",
                        width: '100%',
                        color: date ? 'white' : 'transparent',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
                  {/* All Day Checkbox */}
                  <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '43px' }}>
                    <label 
                      htmlFor="eplanner-allday"
                      style={{ 
                        color: 'white', 
                        fontSize: '16px',
                        cursor: 'pointer',
                        userSelect: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <input
                        id="eplanner-allday"
                        name="allday"
                        type="checkbox"
                        checked={isAllDay}
                        onChange={handleAllDayChange}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: '#8080FF',
                          cursor: 'pointer'
                        }}
                        disabled={loading}
                      />
                      All day
                    </label>
                  </div>
                  {/* Weekdays */}
                  <div style={{ marginBottom: '15px', marginRight: '355px' }}>
                    <select
                      id="eplanner-weekdays"
                      name="weekdays"
                      value={weekdays}
                      onChange={handleWeekdaysChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginLeft: '43px',
                        left: '80%',
                        border: '2px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        backgroundColor: "#1b1728",
                        color: weekdays ? 'white' : '#9ca3af',
                      }}
                      disabled={loading}
                    >
                      <option value="" style={{ color: '#9ca3af' }}>Does not repeat</option>
                      <option value="mon">Monday</option>
                      <option value="tue">Tuesday</option>
                      <option value="wed">Wednesday</option>
                      <option value="thu">Thursday</option>
                      <option value="fri">Friday</option>
                      <option value="sat">Saturday</option>
                      <option value="sun">Sunday</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  {/* Start Time - Only show when not All Day */}
                  {!isAllDay && (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '18px' }}>
                    <div style={{ marginTop : '10px'}}>
                      <svg width="25" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                        <polyline points="12,6 12,12 16,14" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                      <div 
                        role="button"
                        tabIndex={0}
                        style={{ 
                          marginBottom: '15px', 
                          position: 'relative',
                          cursor: 'pointer',
                          backgroundColor: "#1b1728",
                          borderRadius: '4px',
                          border: '1px'
                        }}
                        onClick={() => document.getElementById('eplanner-starttime').showPicker()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            document.getElementById('eplanner-starttime').showPicker();
                          }
                        }}
                      >
                        {/* Show placeholder text when no start time is selected */}
                        {!starttime && (
                          <span style={{
                            position: 'absolute',
                            left: '12px',
                            top: '10px',
                            color: '#9ca3af',
                            fontSize: '16px',
                            pointerEvents: 'none'
                          }}>
                            Start Time
                          </span>
                        )}
                        <input
                          id="eplanner-starttime"
                          name="starttime"
                          type="time"
                          value={starttime}
                          onChange={handleStarttimeChange}
                          style={{
                            width: '100%',
                            padding: '10px 15px',
                            // marginLeft: '41px',
                            border: '2px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                            backgroundColor: "#1b1728",
                            color: starttime ? 'white' : 'transparent',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                          disabled={loading}
                        />
                      </div>
                  </div>
                  )}
                    
                  {/* Description */}
                  <div style={{ marginBottom: '15px' , display: 'flex', flexDirection: 'row', gap: '18px'}}>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <div style={{ display: 'flex', marginLeft: '2px'}}>
                        <svg width="23" height="25" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        </svg>
                    </div>
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
                        border: '2px',
                        marginLeft: '0px',
                        borderRadius: '4px',
                        fontSize: '16px',
                        boxSizing: 'border-box',
                        resize: 'vertical',
                        backgroundColor: "#1b1728",
                        color: 'white'
                      }}
                      disabled={loading}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' , alignItems: 'center',  marginLeft:'250px'}}>
                    <button
                      type="button"
                      onClick={saveReminderData}
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
                    <button type="button" onClick={removeReminderData} style={{
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
                  <h3 style={{ color: 'white' , margin:'0px 60px 0px 20px'}}> Your Tasks ({ReminderItems.length})</h3>

                  {loading && (
                    <div style={{ textAlign: 'center', padding: '0px'}}>
                      <p> Loading tasks...</p>
                    </div>
                  )}

                  {!loading && ReminderItems.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '30px',
                      backgroundColor: '#1b1728',
                      borderRadius: '8px',
                      border: '2px'
                    }}>
                      <p style={{ fontSize: '48px', margin: '10px 0' }}>X</p>
                      <p style={{ color: '#6c757d', margin: '0' }}>No tasks yet. Add your first task above!</p>
                    </div>
                  )}

                  {!loading && ReminderItems.length > 0 && (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {ReminderItems.map((item, index) => (
                        <div key={item.id || index} style={{
                          backgroundColor: '#1b1728',
                          border: '1px',
                          borderRadius: '8px',
                          padding: '15px',
                          marginBottom: '10px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          position: 'relative'
                        }}>
                          <button
                            type="button"
                            onClick={() => deleteReminderItem(item.id)}
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
                              marginRight: '8px'
                            }}>
                              Weekdays: {getWeekdayDisplay(item.weekdays)}
                            </div>
                          )}
                          {item.starttime && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              marginRight: '8px'
                            }}>
                              Time: {item.starttime}
                            </div>
                          )}
                          {!item.starttime && item.date && (
                            <div style={{
                              display: 'inline-block',
                              backgroundColor: '#1b1728',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              marginRight: '8px'
                            }}>
                              All day
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

const ReminderPlanner = ({ hideButton }) => {
    
    return (
        <ReminderCard hideButton={hideButton} />
    )
}

export default ReminderPlanner;