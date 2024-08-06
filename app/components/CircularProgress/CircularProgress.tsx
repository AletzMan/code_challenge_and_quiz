import React, { useState, useEffect, SVGProps } from 'react'

interface CircularProgressBarProps {
    percentage: number
    isProcentage?: boolean
    props?: SVGProps<SVGSVGElement>
    colorFill?: string
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, isProcentage, colorFill, props }) => {


    const radius = 30
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <svg {...props} width="80" height="80" viewBox="0 0 80 80">
            <circle
                cx="40"
                cy="40"
                r={radius}
                fill={colorFill}
                stroke="#454545"
                strokeWidth="4"
            />
            <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
            //style={{ transition: "stroke-dashoffset 0.85s linear" }}
            />
            {isProcentage && <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="20px" fill="#000">
                {Math.round(percentage)}%
            </text>}
        </svg>
    )
}

export default CircularProgressBar
