import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import ContactDrawer from './ContactDrawer';
import './Contacts.css';

// Checkbox component
const Checkbox = ({ checked, onChange }) => (
  <div className="contacts-checkbox-base" onClick={onChange}>
    <div className={`contacts-checkbox-rectangle ${checked ? 'checked' : ''}`}>
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L4.5 8.5L2 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  </div>
);

// SortIcon component
const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.940000057220459 2L11.06000036239624 2L8 14L4.940000057220459 2Z" fill="#798089"/>
  </svg>
);

// DotIcon component (for status)
const DotIcon = ({ color }) => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="3" cy="3" r="3" fill={color}/>
  </svg>
);

// ArrowRightLineIcon component (for action button)
const ArrowRightLineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.3334 10H16.6667M16.6667 10L10.0001 3.33337M16.6667 10L10.0001 16.6667" stroke="#7A7A7A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Contacts = ({ onReturnToTitle, onNavigateToPage, contactsData: propContactsData, contactToOpen, onContactOpened }) => {
  const [activeNavItem, setActiveNavItem] = useState('contacts');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Use propContactsData if provided, otherwise fall back to local data
  const contactsData = propContactsData || [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'j.doe@invesco.com',
      company: 'Invesco', 
      lastActivity: 'Mon, Feb 24th', 
      status: 'Active', 
      statusColor: '#1ED761',
      aiSummary: 'John is interested in BX X and is now in a due diligence process. He has spent a majority of his time on the \'Jupiter Industrial Portfolio\' as a seed asset in BX X, also looking to industrial performance in the BX IX quarterly report.',
      sharedAssets: [
        {
          id: 1,
          type: 'PDF',
          title: 'BX Digital Infrastructure Strategy',
          thumbnail: '/Assets/Prototype/BX Digital Infrastructure Strategy.png',
          file: '/pdfs/BX Digital Infrastructure Strategy.pdf'
        },
        {
          id: 2,
          type: 'PDF',
          title: '$25bn in Pennsylvania Data Centers',
          thumbnail: '/Assets/$25bn in Pennsylvania Data Centers.jpg'
        },
        {
          id: 3,
          type: 'PDF',
          title: 'Artificial Intelligence through Private Markets',
          thumbnail: '/Assets/Artificial Intelligence through Private Markets.jpg'
        }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'j.smith@kkr.com',
      company: 'KKR', 
      lastActivity: 'Tue, Mar 1st', 
      status: 'Active', 
      statusColor: '#1ED761',
      aiSummary: 'Jane is exploring infrastructure opportunities and has shown particular interest in data center investments. She has been reviewing quarterly performance reports and portfolio analytics.',
      sharedAssets: [
        {
          id: 1,
          type: 'PDF',
          title: 'KKR Infrastructure - Presentation',
          thumbnail: '/Assets/KKR Infrastructure - Presentation.png'
        }
      ]
    },
    { 
      id: 3, 
      name: 'David Johnson', 
      email: 'd.johnson@coatue.com',
      company: 'Coatue', 
      lastActivity: 'Wed, Apr 10th', 
      status: 'Pending', 
      statusColor: '#F0C808',
      aiSummary: 'David is evaluating technology-focused private market strategies. He has been analyzing AI-related investment opportunities and digital infrastructure assets.',
      sharedAssets: [
        {
          id: 1,
          type: 'PDF',
          title: 'Coatue Innovative Strategies (CTEK)',
          thumbnail: '/Assets/Coatue Innovative Strategies (CTEK).png'
        },
        {
          id: 2,
          type: 'PDF',
          title: 'Artificial Intelligence through Private Markets',
          thumbnail: '/Assets/Artificial Intelligence through Private Markets.jpg'
        }
      ]
    },
    { 
      id: 4, 
      name: 'Emily White', 
      email: 'e.white@blackstone.com',
      company: 'Blackstone', 
      lastActivity: 'Thu, May 15th', 
      status: 'Active', 
      statusColor: '#1ED761',
      aiSummary: 'Emily is interested in BX X and is now in a due diligence process. She has spent a majority of her time on the \'Jupiter Industrial Portfolio\' as a seed asset in BX X, also looking to industrial performance in the BX IX quarterly report.',
      sharedAssets: []
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      email: 'm.brown@kkr.com',
      company: 'KKR', 
      lastActivity: 'Fri, Jun 20th', 
      status: 'Active', 
      statusColor: '#1ED761',
      aiSummary: 'Michael is actively researching infrastructure investment strategies. He has been focusing on renewable energy assets and sustainable infrastructure projects.',
      sharedAssets: [
        {
          id: 1,
          type: 'PDF',
          title: 'KKR Infrastructure - Presentation',
          thumbnail: '/Assets/KKR Infrastructure - Presentation.png'
        }
      ]
    },
    { 
      id: 6, 
      name: 'Sarah Davis', 
      email: 's.davis@coatue.com',
      company: 'Coatue', 
      lastActivity: 'Sat, Jul 25th', 
      status: 'Pending', 
      statusColor: '#F0C808',
      aiSummary: 'Sarah is exploring innovative technology investments through private markets. She has shown interest in AI-driven strategies and digital transformation opportunities.',
      sharedAssets: []
    },
  ];

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    
    // Handle navigation between pages
    if (itemId === 'assets') {
      onNavigateToPage && onNavigateToPage('assets');
    } else if (itemId === 'insights') {
      onNavigateToPage && onNavigateToPage('insights');
    } else if (itemId === 'settings') {
      onNavigateToPage && onNavigateToPage('settings');
    }
    
    // Handle special navigation items
    if (itemId === 'logout') {
      console.log('Logout clicked');
    } else if (itemId === 'my-account') {
      console.log('My account clicked');
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(contactsData.map(contact => contact.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(contactId)) {
        newSelection.delete(contactId);
      } else {
        newSelection.add(contactId);
      }
      // Update selectAll based on whether all contacts are selected
      setSelectAll(newSelection.size === contactsData.length);
      return newSelection;
    });
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };

  const handleViewProfile = (e, contact) => {
    e.stopPropagation();
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContact(null);
    if (onContactOpened) {
      onContactOpened();
    }
  };

  // Auto-open drawer when contactToOpen is provided
  useEffect(() => {
    if (contactToOpen && contactsData.length > 0) {
      const contact = contactsData.find(c => c.name === contactToOpen);
      if (contact) {
        setSelectedContact(contact);
        setIsDrawerOpen(true);
        if (onContactOpened) {
          // Clear the contactToOpen after opening
          setTimeout(() => {
            onContactOpened();
          }, 100);
        }
      }
    }
  }, [contactToOpen, contactsData, onContactOpened]);

  return (
    <div className="contacts">
      <SideNav 
        onNavItemClick={handleNavItemClick}
        activeItem={activeNavItem}
        onLogoClick={onReturnToTitle}
      />
      
      <div className="contacts-main">
        <div className="contacts-header">
          <h1 className="contacts-title">Contacts</h1>
          <div className="contacts-header-right">
            <div className="contacts-search-container">
              <div className="contacts-search-input-wrapper">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="contacts-search-icon">
                  <path d="M16.6667 16.6667L13.3334 13.3334M15.8334 9.16671C15.8334 12.8446 12.8446 15.8334 9.16671 15.8334C5.4888 15.8334 2.5 12.8446 2.5 9.16671C2.5 5.4888 5.4888 2.5 9.16671 2.5C12.8446 2.5 15.8334 5.4888 15.8334 9.16671Z" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Start typing to search..." 
                  className="contacts-search-input"
                />
              </div>
            </div>
            <div className="contacts-header-buttons">
              <button className="contacts-button-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="#000000"/>
                </svg>
                <span>Import</span>
              </button>
              <button className="contacts-button-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16675V15.8334M4.16667 10H15.8333" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add contact</span>
              </button>
            </div>
          </div>
        </div>

        <div className="contacts-content">
          <div className="contacts-table-container">
            <div className="contacts-table-header">
              <div className="contacts-table-header-cell checkbox-cell">
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
              </div>
              <div className="contacts-table-header-cell">
                <span className="header-label">Name</span>
                <SortIcon />
              </div>
              <div className="contacts-table-header-cell">
                <span className="header-label">Email</span>
                <SortIcon />
              </div>
              <div className="contacts-table-header-cell">
                <span className="header-label">Assets</span>
                <SortIcon />
              </div>
              <div className="contacts-table-header-cell">
                <span className="header-label">Last Activity</span>
                <SortIcon />
              </div>
              <div className="contacts-table-header-cell action-cell">
                <span className="header-label">Action</span>
              </div>
            </div>

            <div className="contacts-table-body">
              {contactsData.map(contact => (
                <div 
                  key={contact.id} 
                  className="contacts-table-row"
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="contacts-table-cell checkbox-cell" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedContacts.has(contact.id)} 
                      onChange={() => handleSelectContact(contact.id)} 
                    />
                  </div>
                  <div className="contacts-table-cell">
                    <span className="cell-text">{contact.name}</span>
                  </div>
                  <div className="contacts-table-cell">
                    <span className="cell-text">{contact.email || ''}</span>
                  </div>
                  <div className="contacts-table-cell">
                    <span className="cell-text">
                      {(() => {
                        // Generate consistent number between 5-39 based on contact id
                        const seed = contact.id || 0;
                        return ((seed * 17) % 35) + 5; // 35 possible values (5-39)
                      })()}
                    </span>
                  </div>
                  <div className="contacts-table-cell">
                    <span className="cell-text">{contact.lastActivity}</span>
                  </div>
                  <div className="contacts-table-cell action-cell">
                    <button 
                      className="view-profile-button"
                      onClick={(e) => handleViewProfile(e, contact)}
                    >
                      <span>View Profile</span>
                      <ArrowRightLineIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ContactDrawer 
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        contact={selectedContact}
      />
    </div>
  );
};

export default Contacts;

