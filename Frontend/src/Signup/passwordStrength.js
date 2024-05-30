import React from 'react'
import "./passwordStrength.css"

const PasswordStrengthMeter = ({password}) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    const calculatePasswordStrength = () => {
        let strength = 0

        if (password.length > 8) strength += 1
        if (strongRegex.test(password)) strength += 1
        if (mediumRegex.test(password)) strength += 1
        return strength
    }

    function getStrengthBarColor(strength) {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange'
            case 3: return 'lightgreen'
            default: return 'grey'
        }
    }

    const strength = calculatePasswordStrength()
    const strengthBarColor = getStrengthBarColor(strength)
    const strengthBarStyle = {
        width: `${(strength / 3) * 100}%`,
        backgroundColor: strengthBarColor,
        filter: strength > 0 ? `drop-shadow(0 0 5px ${strengthBarColor})` : 'none'
    }

    return (
        <div className={'passwordStrengthMeter'}>
            <div className={'passwordStrengthContainer'}>
                <div className={'strengthBar'} style={strengthBarStyle}></div>
            </div>
        </div>
    )
}

export default PasswordStrengthMeter;
