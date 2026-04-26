const { useState, useEffect } = React;

function App() {
  const [token, setToken] = useState(null);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    setError('');
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      // Assuming backend returns { access_token: '...' }
      setToken(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    setError('');
    try {
      const res = await fetch(`/weather?city=${encodeURIComponent(city)}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      // Expected shape: { city, temperature, humidity, description }
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'Weather App'),
    error && React.createElement('p', { style: { color: 'red' } }, error),
    !token
      ? React.createElement(
          'form',
          { onSubmit: handleLogin },
          React.createElement(
            'div',
            null,
            React.createElement('label', null, 'Username:'),
            React.createElement('input', { type: 'text', name: 'username', required: true })
          ),
          React.createElement(
            'div',
            null,
            React.createElement('label', null, 'Password:'),
            React.createElement('input', { type: 'password', name: 'password', required: true })
          ),
          React.createElement('button', { type: 'submit' }, 'Login')
        )
      : React.createElement(
          'div',
          null,
          React.createElement(
            'form',
            { onSubmit: handleSearch },
            React.createElement('input', {
              type: 'text',
              placeholder: 'Enter city',
              value: city,
              onChange: (e) => setCity(e.target.value),
              required: true
            }),
            React.createElement('button', { type: 'submit' }, 'Get Weather')
          ),
          weather &&
            React.createElement(
              'div',
              { className: 'weather-card' },
              React.createElement('h2', null, weather.city),
              React.createElement('p', null, `Temperature: ${weather.temperature}°C`),
              React.createElement('p', null, `Humidity: ${weather.humidity}%`),
              React.createElement('p', null, `Description: ${weather.description}`)
            )
        )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
