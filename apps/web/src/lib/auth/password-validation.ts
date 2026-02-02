export interface PasswordRequirement {
    id: string;
    label: string;
    met: boolean;
}

export interface PasswordStrength {
    score: number; // 0 to 4
    label: 'Weak' | 'Fair' | 'Good' | 'Strong';
    color: 'error' | 'warning' | 'success'; // Mapping to UI colors
    requirements: PasswordRequirement[];
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
    const requirements: PasswordRequirement[] = [
        {
            id: 'length',
            label: 'At least 8 characters',
            met: password.length >= 8
        },
        {
            id: 'uppercase',
            label: 'At least one uppercase letter',
            met: /[A-Z]/.test(password)
        },
        {
            id: 'lowercase',
            label: 'At least one lowercase letter',
            met: /[a-z]/.test(password)
        },
        {
            id: 'number',
            label: 'At least one number',
            met: /\d/.test(password)
        },
        {
            id: 'special',
            label: 'At least one special character',
            met: /[^A-Za-z0-9]/.test(password)
        }
    ];

    const metCount = requirements.filter(r => r.met).length;

    // Calculate score based on met requirements
    // 0-1: Weak (0-1 reqs met)
    // 2: Fair (2-3 reqs met)
    // 3: Good (4 reqs met)
    // 4: Strong (All 5 reqs met)

    let score = 0;
    if (metCount >= 5) score = 4;
    else if (metCount >= 4) score = 3;
    else if (metCount >= 2) score = 2;
    else if (strengthBaseScore(password) > 0) score = 1;

    let label: PasswordStrength['label'] = 'Weak';
    let color: PasswordStrength['color'] = 'error';

    if (score >= 4) {
        label = 'Strong';
        color = 'success';
    } else if (score === 3) {
        label = 'Good';
        color = 'success'; // or a lighter green if available
    } else if (score === 2) {
        label = 'Fair';
        color = 'warning';
    }

    return {
        score,
        label,
        color,
        requirements
    };
};

function strengthBaseScore(password: string): number {
    return password.length > 0 ? 1 : 0;
}
