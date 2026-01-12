import React from 'react';

const RegistrationForm: React.FC = () => {
    const [ name, setName ] = React.useState<string>('');
    const [ email, setEmail ] = React.useState<string>('');
    const [ password, setPassword ] = React.useState<string>('');

    const clearForm = React.useCallback(() => {
        setName('');
        setEmail('');
        setPassword('');
    }, []);

    return (
        <>
            <form>
                <input
                    type='text'
                    placeholder='Име'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Имейл'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Парола'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='button' onClick={clearForm}>
                    Изчисти
                </button>
            </form>
            <div>
                <p>Въведено име: {name || '—'}</p>
                <p>Въведен имейл: {email || '—'}</p>
                <p>Въведена парола: {password || '—'}</p>
            </div>
        </>
    );
};

export default RegistrationForm;