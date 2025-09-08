import React from 'react';

const features = [
  {
    icon: '💬',
    title: 'Projects',
    description: 'Manage and view user messages from contact forms.',
  },
  {
    icon: '📢',
    title: 'SKills',
    description: 'Post updates or announcements for all users.',
  },
  {
    icon: '👥',
    title: 'Users',
    description: 'Manage users, permissions, and profiles.',
  },
  {
    icon: '✨',
    title: 'Services',
    description: 'Apply new features and improvements to the site.',
  },
];

const Siteadmin = () => {
  console.log('Dashboard loaded');

  return (
    <div className="card">
      <h3 className="header">Dashboard</h3>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Siteadmin;
