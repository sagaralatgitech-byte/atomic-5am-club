import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, TrendingUp, Award, Sun, Moon, Book, Heart, Target, Plus, Trash2, Edit2, Clock, Bell, Download, AlertCircle } from 'lucide-react';

const AtomicProductivityTool = () => {
    const [activeTab, setActiveTab] = useState('morning');
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    // Morning 20/20/20 Routine
    const [morningRoutine, setMorningRoutine] = useState({
        move: { completed: false, duration: 20, activity: '', time: '5:00 - 5:20 AM' },
        reflect: { completed: false, duration: 20, activity: '', time: '5:20 - 5:40 AM' },
        grow: { completed: false, duration: 20, activity: '', time: '5:40 - 6:00 AM' }
    });

    // Gratitude Journal
    const [gratitude, setGratitude] = useState(['', '', '']);

    // Habit Tracker
    const [habits, setHabits] = useState([
        { id: 1, name: 'Wake up at 5 AM', category: 'Morning', streak: 0, completed: false, twoMinuteVersion: 'Set alarm for 5 AM' },
        { id: 2, name: 'Read for 30 minutes', category: 'Growth', streak: 0, completed: false, twoMinuteVersion: 'Read 1 page' },
        { id: 3, name: 'Exercise', category: 'Health', streak: 0, completed: false, twoMinuteVersion: 'Put on workout clothes' }
    ]);

    // Weekly Planner
    const [weeklyGoals, setWeeklyGoals] = useState([
        { id: 1, goal: '', category: 'Health', completed: false },
        { id: 2, goal: '', category: 'Career', completed: false },
        { id: 3, goal: '', category: 'Personal', completed: false }
    ]);

    // Daily Tasks
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Time Blocking Schedule (5 AM to 11 PM)
    const timeSlots = [
        '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    const [timeBlocks, setTimeBlocks] = useState([
        { id: 1, time: '5:00 AM', activity: 'Victory Hour: 20/20/20 Formula', category: 'morning', completed: false, duration: 60 },
        { id: 2, time: '9:00 AM', activity: '90/90/1: Focus on #1 Priority Project', category: 'deep-work', completed: false, duration: 90 },
        { id: 3, time: '10:30 AM', activity: 'Work Block (60/10 Method)', category: 'work', completed: false, duration: 60 },
        { id: 4, time: '12:30 PM', activity: 'Lunch & Rest', category: 'break', completed: false, duration: 60 },
        { id: 5, time: '5:00 PM', activity: 'Second Wind Workout', category: 'exercise', completed: false, duration: 60 }
    ]);

    // Daily Five Concept
    const [dailyFive, setDailyFive] = useState(['', '', '', '', '']);

    // Stats
    const [stats, setStats] = useState({
        totalDays: 0,
        perfectDays: 0,
        currentStreak: 0,
        longestStreak: 0
    });

    // Identity Statement
    const [identity, setIdentity] = useState({
        statement: 'I am someone who takes care of my health and pursues growth daily',
        updated: false
    });

    // Habit Stacking
    const [habitStacks, setHabitStacks] = useState([
        { id: 1, trigger: 'After I wake up', newHabit: 'I will drink a glass of water', completed: false }
    ]);

    // Load data from storage
    useEffect(() => {
        loadData();
    }, [currentDate]);

    const loadData = async () => {
        try {
            const dateKey = `data-${currentDate}`;
            const result = await window.storage.get(dateKey);

            if (result) {
                const data = JSON.parse(result.value);
                setMorningRoutine(data.morningRoutine || morningRoutine);
                setGratitude(data.gratitude || ['', '', '']);
                setHabits(data.habits || habits);
                setTasks(data.tasks || []);
                setTimeBlocks(data.timeBlocks || timeBlocks);
                setDailyFive(data.dailyFive || ['', '', '', '', '']);
            }

            // Load stats
            const statsResult = await window.storage.get('stats');
            if (statsResult) {
                setStats(JSON.parse(statsResult.value));
            }

            // Load weekly goals
            const weekResult = await window.storage.get('weekly-goals');
            if (weekResult) {
                setWeeklyGoals(JSON.parse(weekResult.value));
            }

            // Load identity
            const identityResult = await window.storage.get('identity');
            if (identityResult) {
                setIdentity(JSON.parse(identityResult.value));
            }

            // Load habit stacks
            const stacksResult = await window.storage.get('habit-stacks');
            if (stacksResult) {
                setHabitStacks(JSON.parse(stacksResult.value));
            }
        } catch (error) {
            console.log('No saved data for this date');
        }
    };

    const saveData = async () => {
        try {
            const dateKey = `data-${currentDate}`;
            const data = {
                morningRoutine,
                gratitude,
                habits,
                tasks,
                timeBlocks,
                dailyFive,
                date: currentDate
            };

            await window.storage.set(dateKey, JSON.stringify(data));
            await window.storage.set('stats', JSON.stringify(stats));
            await window.storage.set('weekly-goals', JSON.stringify(weeklyGoals));
            await window.storage.set('identity', JSON.stringify(identity));
            await window.storage.set('habit-stacks', JSON.stringify(habitStacks));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    useEffect(() => {
        saveData();
    }, [morningRoutine, gratitude, habits, tasks, stats, weeklyGoals, identity, habitStacks, timeBlocks, dailyFive]);

    const toggleMorningActivity = (activity) => {
        setMorningRoutine(prev => ({
            ...prev,
            [activity]: { ...prev[activity], completed: !prev[activity].completed }
        }));
    };

    const updateMorningActivity = (activity, field, value) => {
        setMorningRoutine(prev => ({
            ...prev,
            [activity]: { ...prev[activity], [field]: value }
        }));
    };

    const updateGratitude = (index, value) => {
        const newGratitude = [...gratitude];
        newGratitude[index] = value;
        setGratitude(newGratitude);
    };

    const toggleHabit = (habitId) => {
        setHabits(habits.map(habit => {
            if (habit.id === habitId) {
                const newCompleted = !habit.completed;
                const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
                return { ...habit, completed: newCompleted, streak: newStreak };
            }
            return habit;
        }));
    };

    const addHabit = () => {
        const newHabit = {
            id: Date.now(),
            name: '',
            category: 'Personal',
            streak: 0,
            completed: false,
            twoMinuteVersion: ''
        };
        setHabits([...habits, newHabit]);
    };

    const updateHabit = (habitId, field, value) => {
        setHabits(habits.map(habit =>
            habit.id === habitId ? { ...habit, [field]: value } : habit
        ));
    };

    const deleteHabit = (habitId) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    };

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority: 'medium' }]);
            setNewTask('');
        }
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const updateWeeklyGoal = (goalId, field, value) => {
        setWeeklyGoals(weeklyGoals.map(goal =>
            goal.id === goalId ? { ...goal, [field]: value } : goal
        ));
    };

    const toggleWeeklyGoal = (goalId) => {
        setWeeklyGoals(weeklyGoals.map(goal =>
            goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        ));
    };

    const addHabitStack = () => {
        setHabitStacks([...habitStacks, {
            id: Date.now(),
            trigger: '',
            newHabit: '',
            completed: false
        }]);
    };

    const updateHabitStack = (stackId, field, value) => {
        setHabitStacks(habitStacks.map(stack =>
            stack.id === stackId ? { ...stack, [field]: value } : stack
        ));
    };

    const toggleHabitStack = (stackId) => {
        setHabitStacks(habitStacks.map(stack =>
            stack.id === stackId ? { ...stack, completed: !stack.completed } : stack
        ));
    };

    const deleteHabitStack = (stackId) => {
        setHabitStacks(habitStacks.filter(stack => stack.id !== stackId));
    };

    const addTimeBlock = () => {
        setTimeBlocks([...timeBlocks, {
            id: Date.now(),
            time: '',
            activity: '',
            category: 'work',
            completed: false,
            duration: 60
        }]);
    };

    const updateTimeBlock = (blockId, field, value) => {
        setTimeBlocks(timeBlocks.map(block =>
            block.id === blockId ? { ...block, [field]: value } : block
        ));
    };

    const toggleTimeBlock = (blockId) => {
        setTimeBlocks(timeBlocks.map(block =>
            block.id === blockId ? { ...block, completed: !block.completed } : block
        ));
    };

    const deleteTimeBlock = (blockId) => {
        setTimeBlocks(timeBlocks.filter(block => block.id !== blockId));
    };

    const updateDailyFive = (index, value) => {
        const newDailyFive = [...dailyFive];
        newDailyFive[index] = value;
        setDailyFive(newDailyFive);
    };

    const exportToGoogleCalendar = () => {
        let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Atomic 5 AM Club//EN\n';

        // Add Victory Hour
        if (morningRoutine.move.activity || morningRoutine.reflect.activity || morningRoutine.grow.activity) {
            const date = currentDate.replace(/-/g, '');
            icsContent += `BEGIN:VEVENT\nDTSTART:${date}T050000\nDTEND:${date}T060000\nSUMMARY:Victory Hour - 20/20/20 Formula\n`;
            icsContent += `DESCRIPTION:MOVE: ${morningRoutine.move.activity}\\nREFLECT: ${morningRoutine.reflect.activity}\\nGROW: ${morningRoutine.grow.activity}\n`;
            icsContent += `BEGIN:VALARM\nTRIGGER:-PT15M\nACTION:DISPLAY\nDESCRIPTION:Victory Hour starts in 15 minutes\nEND:VALARM\nEND:VEVENT\n`;
        }

        // Add time blocks
        timeBlocks.forEach(block => {
            if (block.activity && block.time) {
                const date = currentDate.replace(/-/g, '');
                const timeMatch = block.time.match(/(\d+):(\d+)\s*(AM|PM)/);
                if (timeMatch) {
                    let [, hours, minutes, period] = timeMatch;
                    hours = parseInt(hours);
                    if (period === 'PM' && hours !== 12) hours += 12;
                    if (period === 'AM' && hours === 12) hours = 0;
                    const startTime = `${date}T${hours.toString().padStart(2, '0')}${minutes}00`;
                    const endHour = hours + Math.floor(block.duration / 60);
                    const endMin = (parseInt(minutes) + (block.duration % 60)).toString().padStart(2, '0');
                    const endTime = `${date}T${endHour.toString().padStart(2, '0')}${endMin}00`;

                    icsContent += `BEGIN:VEVENT\nDTSTART:${startTime}\nDTEND:${endTime}\nSUMMARY:${block.activity}\n`;
                    icsContent += `BEGIN:VALARM\nTRIGGER:-PT10M\nACTION:DISPLAY\nDESCRIPTION:${block.activity} starts in 10 minutes\nEND:VALARM\nEND:VEVENT\n`;
                }
            }
        });

        icsContent += 'END:VCALENDAR';

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `atomic-5am-schedule-${currentDate}.ics`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getMorningProgress = () => {
        const completed = Object.values(morningRoutine).filter(a => a.completed).length;
        return (completed / 3) * 100;
    };

    const getHabitCompletionRate = () => {
        if (habits.length === 0) return 0;
        const completed = habits.filter(h => h.completed).length;
        return Math.round((completed / habits.length) * 100);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'morning': 'bg-yellow-100 border-yellow-300 text-yellow-800',
            'deep-work': 'bg-purple-100 border-purple-300 text-purple-800',
            'work': 'bg-blue-100 border-blue-300 text-blue-800',
            'break': 'bg-green-100 border-green-300 text-green-800',
            'exercise': 'bg-orange-100 border-orange-300 text-orange-800',
            'learning': 'bg-indigo-100 border-indigo-300 text-indigo-800',
            'personal': 'bg-pink-100 border-pink-300 text-pink-800'
        };
        return colors[category] || 'bg-gray-100 border-gray-300 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Atomic 5 AM Club
                            </h1>
                            <p className="text-gray-600 mt-2">Build atomic habits, own your morning, elevate your life</p>
                        </div>
                        <div className="text-right">
                            <input
                                type="date"
                                value={currentDate}
                                onChange={(e) => setCurrentDate(e.target.value)}
                                className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                            <p className="text-sm text-gray-500 mt-2">Day {stats.totalDays} of your journey</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="text-blue-600" size={20} />
                                <span className="text-sm text-gray-600">Current Streak</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-700 mt-2">{stats.currentStreak} days</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Award className="text-green-600" size={20} />
                                <span className="text-sm text-gray-600">Perfect Days</span>
                            </div>
                            <p className="text-2xl font-bold text-green-700 mt-2">{stats.perfectDays}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Sun className="text-purple-600" size={20} />
                                <span className="text-sm text-gray-600">Morning Routine</span>
                            </div>
                            <p className="text-2xl font-bold text-purple-700 mt-2">{Math.round(getMorningProgress())}%</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Target className="text-orange-600" size={20} />
                                <span className="text-sm text-gray-600">Habits Today</span>
                            </div>
                            <p className="text-2xl font-bold text-orange-700 mt-2">{getHabitCompletionRate()}%</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-xl mb-6 p-2">
                    <div className="grid grid-cols-4 gap-2">
                        {['morning', 'schedule', 'habits', 'identity', 'stacking', 'tasks', 'weekly', 'gratitude'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === tab
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Morning 20/20/20 Routine */}
                {activeTab === 'morning' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Sun className="text-yellow-500" />
                            Victory Hour: 20/20/20 Formula
                        </h2>
                        <p className="text-gray-600 mb-6">The first hour of your day split into three 20-minute periods. Master your morning, master your life.</p>

                        <div className="space-y-6">
                            {/* Move */}
                            <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleMorningActivity('move')}
                                            className="text-blue-600"
                                        >
                                            {morningRoutine.move.completed ? <CheckCircle size={32} fill="currentColor" /> : <Circle size={32} />}
                                        </button>
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-700">5:00 - 5:20 AM: MOVE</h3>
                                            <p className="text-sm text-gray-600">Vigorous exercise to boost BDNF, dopamine & serotonin</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What exercise did you do? (e.g., jogging, yoga, HIIT)"
                                    value={morningRoutine.move.activity}
                                    onChange={(e) => updateMorningActivity('move', 'activity', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Reflect */}
                            <div className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleMorningActivity('reflect')}
                                            className="text-purple-600"
                                        >
                                            {morningRoutine.reflect.completed ? <CheckCircle size={32} fill="currentColor" /> : <Circle size={32} />}
                                        </button>
                                        <div>
                                            <h3 className="text-xl font-bold text-purple-700">5:20 - 5:40 AM: REFLECT</h3>
                                            <p className="text-sm text-gray-600">Meditation, journaling, visualization, prayer</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What reflection practice? (e.g., meditation, journaling, prayer)"
                                    value={morningRoutine.reflect.activity}
                                    onChange={(e) => updateMorningActivity('reflect', 'activity', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
                                />

                                {/* Daily Five Concept */}
                                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-700 mb-3">Daily Five Concept: List 5 targets for today</h4>
                                    <div className="space-y-2">
                                        {dailyFive.map((item, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                placeholder={`Target ${index + 1}`}
                                                value={item}
                                                onChange={(e) => updateDailyFive(index, e.target.value)}
                                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Grow */}
                            <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleMorningActivity('grow')}
                                            className="text-green-600"
                                        >
                                            {morningRoutine.grow.completed ? <CheckCircle size={32} fill="currentColor" /> : <Circle size={32} />}
                                        </button>
                                        <div>
                                            <h3 className="text-xl font-bold text-green-700">5:40 - 6:00 AM: GROW</h3>
                                            <p className="text-sm text-gray-600">Reading, learning, skill development</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What did you learn? (e.g., read 20 pages, online course, podcast)"
                                    value={morningRoutine.grow.activity}
                                    onChange={(e) => updateMorningActivity('grow', 'activity', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                            <p className="text-sm text-gray-700">
                                <strong>💡 Remember:</strong> It takes 66 days to reach automaticity. Stay consistent, and never miss twice!
                            </p>
                        </div>
                    </div>
                )}

                {/* Time Blocking Schedule */}
                {activeTab === 'schedule' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <Clock className="text-indigo-600" />
                                    Daily Time Blocking (5 AM - 11 PM)
                                </h2>
                                <p className="text-gray-600 mt-2">Plan your entire day with hour-by-hour time blocks. Includes 90/90/1, 60/10, and Second Wind Workout.</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={addTimeBlock}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Plus size={20} />
                                    Add Block
                                </button>
                                <button
                                    onClick={exportToGoogleCalendar}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Download size={20} />
                                    Export to Calendar
                                </button>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-2">📱 How to get phone alerts:</p>
                                    <ol className="list-decimal ml-4 space-y-1">
                                        <li>Fill in your time blocks below</li>
                                        <li>Click "Export to Calendar" to download an .ics file</li>
                                        <li>Open the file on your phone or import it into Google Calendar</li>
                                        <li>Enable notifications in your calendar app settings</li>
                                        <li>You'll get alerts 10-15 minutes before each block starts!</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Key Productivity Methods */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                                <h4 className="font-bold text-purple-700 mb-2">90/90/1 Rule</h4>
                                <p className="text-sm text-gray-700">For 90 days: First 90 minutes of workday on #1 priority project</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                                <h4 className="font-bold text-blue-700 mb-2">60/10 Method</h4>
                                <p className="text-sm text-gray-700">Work intensely for 60 minutes, then take a 10-minute break to recharge</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                                <h4 className="font-bold text-orange-700 mb-2">Second Wind Workout</h4>
                                <p className="text-sm text-gray-700">Schedule a second workout at end of workday for evening energy</p>
                            </div>
                        </div>

                        {/* Time Blocks */}
                        <div className="space-y-3">
                            {timeBlocks.sort((a, b) => {
                                const timeA = a.time.toLowerCase().includes('pm') && !a.time.startsWith('12')
                                    ? parseInt(a.time) + 12 : parseInt(a.time);
                                const timeB = b.time.toLowerCase().includes('pm') && !b.time.startsWith('12')
                                    ? parseInt(b.time) + 12 : parseInt(b.time);
                                return timeA - timeB;
                            }).map(block => (
                                <div key={block.id} className={`border-2 rounded-xl p-4 ${getCategoryColor(block.category)}`}>
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => toggleTimeBlock(block.id)}
                                            className="mt-1"
                                        >
                                            {block.completed ? <CheckCircle size={24} fill="currentColor" /> : <Circle size={24} />}
                                        </button>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex gap-2">
                                                <select
                                                    value={block.time}
                                                    onChange={(e) => updateTimeBlock(block.id, 'time', e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
                                                >
                                                    <option value="">Select Time</option>
                                                    {timeSlots.map(slot => (
                                                        <option key={slot} value={slot}>{slot}</option>
                                                    ))}
                                                </select>

                                                <input
                                                    type="number"
                                                    value={block.duration}
                                                    onChange={(e) => updateTimeBlock(block.id, 'duration', parseInt(e.target.value))}
                                                    placeholder="Duration (min)"
                                                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                                    min="5"
                                                    step="5"
                                                />
                                                <span className="flex items-center text-sm text-gray-600">min</span>
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="What will you do during this block?"
                                                value={block.activity}
                                                onChange={(e) => updateTimeBlock(block.id, 'activity', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />

                                            <select
                                                value={block.category}
                                                onChange={(e) => updateTimeBlock(block.id, 'category', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm bg-white"
                                            >
                                                <option value="morning">Morning Routine</option>
                                                <option value="deep-work">Deep Work (90/90/1)</option>
                                                <option value="work">Work Block (60/10)</option>
                                                <option value="break">Break / Rest</option>
                                                <option value="exercise">Exercise / Workout</option>
                                                <option value="learning">Learning / Growth</option>
                                                <option value="personal">Personal / Family Time</option>
                                            </select>
                                        </div>

                                        <button
                                            onClick={() => deleteTimeBlock(block.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors mt-1"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {timeBlocks.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <Clock size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No time blocks yet. Click "Add Block" to start planning your day!</p>
                            </div>
                        )}

                        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>🎯 10 Tactics of Lifelong Genius from The 5 AM Club:</strong>
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4 grid grid-cols-2 gap-2">
                                <li>• Tight Bubble of Total Focus (TBTF)</li>
                                <li>• 90/90/1 Rule (90 days, 90 min, 1 project)</li>
                                <li>• 60/10 Method (work/rest cycles)</li>
                                <li>• Daily Five Concept</li>
                                <li>• Second Wind Workout</li>
                                <li>• Two Massage Protocol (2x/week)</li>
                                <li>• Traffic University (learn while commuting)</li>
                                <li>• Dream Team Technique (delegate)</li>
                                <li>• Weekly Design System</li>
                                <li>• 60 Minute Student (daily learning)</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Habit Tracker */}
                {activeTab === 'habits' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                    <Target className="text-indigo-600" />
                                    Atomic Habits Tracker
                                </h2>
                                <p className="text-gray-600 mt-2">Focus on being 1% better every day. Small changes, remarkable results.</p>
                            </div>
                            <button
                                onClick={addHabit}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={20} />
                                Add Habit
                            </button>
                        </div>

                        <div className="space-y-4">
                            {habits.map(habit => (
                                <div key={habit.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-all">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleHabit(habit.id)}
                                            className="text-indigo-600"
                                        >
                                            {habit.completed ? <CheckCircle size={28} fill="currentColor" /> : <Circle size={28} />}
                                        </button>

                                        <div className="flex-1 space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Habit name (e.g., Exercise for 30 minutes)"
                                                value={habit.name}
                                                onChange={(e) => updateHabit(habit.id, 'name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Two-minute version (e.g., Put on workout clothes)"
                                                value={habit.twoMinuteVersion}
                                                onChange={(e) => updateHabit(habit.id, 'twoMinuteVersion', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
                                            />
                                            <select
                                                value={habit.category}
                                                onChange={(e) => updateHabit(habit.id, 'category', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
                                            >
                                                <option>Morning</option>
                                                <option>Health</option>
                                                <option>Growth</option>
                                                <option>Personal</option>
                                                <option>Work</option>
                                            </select>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-indigo-600">{habit.streak}</div>
                                            <div className="text-xs text-gray-500">day streak</div>
                                        </div>

                                        <button
                                            onClick={() => deleteHabit(habit.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>🎯 Four Laws of Behavior Change:</strong>
                            </p>
                            <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                <li>• Make it Obvious - Design your environment to make good habits visible</li>
                                <li>• Make it Attractive - Pair habits with things you enjoy</li>
                                <li>• Make it Easy - Use the Two-Minute Rule to start small</li>
                                <li>• Make it Satisfying - Track your progress and never miss twice</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Identity-Based Habits */}
                {activeTab === 'identity' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Identity-Based Habits</h2>
                        <p className="text-gray-600 mb-6">
                            The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.
                            Every action you take is a vote for the type of person you wish to become.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 mb-6">
                            <label className="block text-lg font-semibold text-indigo-700 mb-3">
                                Who do you want to become?
                            </label>
                            <textarea
                                value={identity.statement}
                                onChange={(e) => setIdentity({ statement: e.target.value, updated: true })}
                                placeholder="I am someone who..."
                                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                                rows="4"
                            />
                            <p className="text-sm text-gray-600 mt-3">
                                Examples: "I am someone who never misses workouts" • "I am a writer who publishes every day" • "I am an early riser who owns my mornings"
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800">How your habits support your identity:</h3>

                            {habits.map(habit => (
                                <div key={habit.id} className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        {habit.completed ? (
                                            <CheckCircle className="text-green-600" size={24} fill="currentColor" />
                                        ) : (
                                            <Circle className="text-gray-400" size={24} />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{habit.name || 'Unnamed habit'}</p>
                                            <p className="text-sm text-gray-600">
                                                ✓ Every time you complete this, you vote for your new identity
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-indigo-600">{habit.streak}</div>
                                            <div className="text-xs text-gray-500">votes cast</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                            <p className="text-sm text-gray-700">
                                <strong>💡 Key Insight:</strong> Your habits are how you embody your identity. Small wins are evidence of your new self.
                                The goal is not to run a marathon; the goal is to become a runner. The goal is not to write a book; the goal is to become a writer.
                            </p>
                        </div>
                    </div>
                )}

                {/* Habit Stacking */}
                {activeTab === 'stacking' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Habit Stacking</h2>
                                <p className="text-gray-600 mt-2">Link a new habit to an existing one. Make new behaviors automatic by anchoring them to your current routines.</p>
                            </div>
                            <button
                                onClick={addHabitStack}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={20} />
                                Add Stack
                            </button>
                        </div>

                        <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                            <p className="font-semibold text-blue-800 mb-2">Formula: After [CURRENT HABIT], I will [NEW HABIT]</p>
                            <p className="text-sm text-blue-600">
                                Example: "After I pour my morning coffee, I will meditate for one minute"
                            </p>
                        </div>

                        <div className="space-y-4">
                            {habitStacks.map(stack => (
                                <div key={stack.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-all">
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={() => toggleHabitStack(stack.id)}
                                            className="text-indigo-600 mt-2"
                                        >
                                            {stack.completed ? <CheckCircle size={24} fill="currentColor" /> : <Circle size={24} />}
                                        </button>

                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Habit (Trigger)</label>
                                                <input
                                                    type="text"
                                                    placeholder="After I..."
                                                    value={stack.trigger}
                                                    onChange={(e) => updateHabitStack(stack.id, 'trigger', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1">New Habit (Action)</label>
                                                <input
                                                    type="text"
                                                    placeholder="I will..."
                                                    value={stack.newHabit}
                                                    onChange={(e) => updateHabitStack(stack.id, 'newHabit', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                                />
                                            </div>

                                            {stack.trigger && stack.newHabit && (
                                                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                                    <p className="text-sm text-indigo-800">
                                                        <strong>Your Stack:</strong> After {stack.trigger}, I will {stack.newHabit}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => deleteHabitStack(stack.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors mt-2"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                            <p className="text-sm text-gray-700">
                                <strong>🔗 Why Habit Stacking Works:</strong> Your current habits are already built into your brain. By linking new behaviors to these established patterns,
                                you make it easier to remember and execute new habits. The key is to make the connection obvious and immediate.
                            </p>
                        </div>
                    </div>
                )}

                {/* Daily Tasks */}
                {activeTab === 'tasks' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Task Manager</h2>

                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                            <button
                                onClick={addTask}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {tasks.map(task => (
                                <div key={task.id} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-all">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="text-indigo-600"
                                    >
                                        {task.completed ? <CheckCircle size={24} fill="currentColor" /> : <Circle size={24} />}
                                    </button>
                                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                        {task.text}
                                    </span>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {tasks.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p>No tasks yet. Add your first task above!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Weekly Planner */}
                {activeTab === 'weekly' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Calendar className="text-indigo-600" />
                            Weekly Goals & Planning
                        </h2>
                        <p className="text-gray-600 mb-6">Weekly Design System: Take 30 minutes to create a plan for each week</p>

                        <div className="space-y-4">
                            {weeklyGoals.map(goal => (
                                <div key={goal.id} className="border-2 border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => toggleWeeklyGoal(goal.id)}
                                            className="text-indigo-600"
                                        >
                                            {goal.completed ? <CheckCircle size={24} fill="currentColor" /> : <Circle size={24} />}
                                        </button>

                                        <div className="flex-1">
                                            <select
                                                value={goal.category}
                                                onChange={(e) => updateWeeklyGoal(goal.id, 'category', e.target.value)}
                                                className="mb-2 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
                                            >
                                                <option>Health</option>
                                                <option>Career</option>
                                                <option>Personal</option>
                                                <option>Relationships</option>
                                                <option>Finance</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="What's your goal for this week?"
                                                value={goal.goal}
                                                onChange={(e) => updateWeeklyGoal(goal.id, 'goal', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setWeeklyGoals([...weeklyGoals, { id: Date.now(), goal: '', category: 'Personal', completed: false }])}
                            className="mt-4 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors w-full justify-center"
                        >
                            <Plus size={20} />
                            Add Weekly Goal
                        </button>
                    </div>
                )}

                {/* Gratitude Journal */}
                {activeTab === 'gratitude' && (
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Heart className="text-pink-500" />
                            Gratitude Journal
                        </h2>
                        <p className="text-gray-600 mb-6">Write three things you're grateful for today. Gratitude shifts your mindset and increases happiness.</p>

                        <div className="space-y-4">
                            {gratitude.map((item, index) => (
                                <div key={index} className="border-2 border-pink-200 rounded-xl p-4 bg-pink-50">
                                    <label className="block text-sm font-semibold text-pink-700 mb-2">
                                        I'm grateful for #{index + 1}
                                    </label>
                                    <textarea
                                        value={item}
                                        onChange={(e) => updateGratitude(index, e.target.value)}
                                        placeholder="What are you grateful for today?"
                                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 resize-none"
                                        rows="3"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200">
                            <p className="text-sm text-gray-700">
                                <strong>💝 Daily Gratitude Practice:</strong> Research shows that practicing gratitude increases happiness, reduces stress, and improves sleep quality. Make it part of your morning reflection time.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AtomicProductivityTool;