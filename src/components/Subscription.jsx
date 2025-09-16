import React, { useState } from 'react';
import { 
  FaCrown, 
  FaCheck, 
  FaTimes, 
  FaStar, 
  FaRocket, 
  FaGem, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaDownload, 
  FaUpload, 
  FaUsers, 
  FaCar, 
  FaChartLine, 
  FaShieldAlt, 
  FaHeadset, 
  FaBell, 
  FaCog, 
  FaArrowRight,
  FaExclamationTriangle,
  FaInfoCircle,
  FaGift,
  FaFire
} from 'react-icons/fa';
import '../styles/Subscription.css';

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Current subscription data
  const currentSubscription = {
    plan: 'Premium',
    status: 'Active',
    price: '$99.99',
    billingCycle: 'monthly',
    nextBilling: '2024-01-20',
    features: [
      'Unlimited car listings',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access',
      'Bulk operations'
    ],
    usage: {
      listings: { used: 45, limit: 'unlimited' },
      storage: { used: '2.3 GB', limit: '10 GB' },
      apiCalls: { used: 1250, limit: 'unlimited' }
    }
  };

  // Available plans
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29.99',
      period: 'month',
      description: 'Perfect for small dealers',
      features: [
        'Up to 50 car listings',
        'Basic analytics',
        'Email support',
        'Standard templates',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 50 listings',
        'Basic reporting only',
        'No API access'
      ],
      popular: false,
      icon: <FaCar />
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$99.99',
      period: 'month',
      description: 'Most popular for growing dealers',
      features: [
        'Unlimited car listings',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'API access',
        'Bulk operations',
        'Advanced reporting',
        'Integration tools'
      ],
      limitations: [],
      popular: true,
      icon: <FaCrown />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299.99',
      period: 'month',
      description: 'For large dealerships',
      features: [
        'Everything in Premium',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'Multi-location support',
        'Custom reporting',
        '24/7 phone support'
      ],
      limitations: [],
      popular: false,
      icon: <FaGem />
    }
  ];

  // Billing history
  const billingHistory = [
    { id: 1, date: '2024-12-20', amount: '$99.99', status: 'Paid', invoice: 'INV-2024-001' },
    { id: 2, date: '2024-11-20', amount: '$99.99', status: 'Paid', invoice: 'INV-2024-002' },
    { id: 3, date: '2024-10-20', amount: '$99.99', status: 'Paid', invoice: 'INV-2024-003' },
    { id: 4, date: '2024-09-20', amount: '$99.99', status: 'Paid', invoice: 'INV-2024-004' }
  ];

  const handleUpgrade = (planId) => {
    setSelectedPlan(planId);
    // Handle upgrade logic here
    console.log(`Upgrading to ${planId} plan`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      console.log('Subscription cancelled');
    }
  };

  const tabs = [
    { id: 'current', label: 'Current Plan', icon: <FaCrown /> },
    { id: 'plans', label: 'Available Plans', icon: <FaRocket /> },
    { id: 'billing', label: 'Billing History', icon: <FaCreditCard /> },
    { id: 'usage', label: 'Usage & Limits', icon: <FaChartLine /> }
  ];

  return (
    <div className="subscription-page">
      <div className="subscription-container">
        {/* Page Header */}
        <div className="subscription-header">
          <div className="subscription-header-content">
            <h1 className="subscription-title">Subscription Management</h1>
            <p className="subscription-subtitle">Manage your subscription plan and billing</p>
          </div>
          <div className="subscription-status">
            <div className={`subscription-status-badge ${currentSubscription.status.toLowerCase()}`}>
              <FaCheck />
              {currentSubscription.status}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="subscription-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`subscription-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="subscription-content">
          {/* Current Plan Tab */}
          {activeTab === 'current' && (
            <div className="subscription-tab-content">
              <div className="subscription-current-plan">
                <div className="subscription-plan-card current">
                  <div className="subscription-plan-header">
                    <div className="subscription-plan-icon">
                      <FaCrown />
                    </div>
                    <div className="subscription-plan-info">
                      <h3 className="subscription-plan-name">{currentSubscription.plan} Plan</h3>
                      <p className="subscription-plan-price">
                        {currentSubscription.price}
                        <span className="subscription-plan-period">/{currentSubscription.billingCycle}</span>
                      </p>
                    </div>
                    <div className="subscription-plan-badge">
                      <FaStar />
                      Current Plan
                    </div>
                  </div>
                  
                  <div className="subscription-plan-features">
                    <h4>Included Features:</h4>
                    <div className="subscription-features-grid">
                      {currentSubscription.features.map((feature, index) => (
                        <div key={index} className="subscription-feature-item">
                          <FaCheck className="subscription-feature-check" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="subscription-plan-actions">
                    <button className="subscription-action-btn upgrade">
                      <FaRocket />
                      Upgrade Plan
                    </button>
                    <button className="subscription-action-btn cancel" onClick={handleCancel}>
                      <FaTimes />
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                <div className="subscription-billing-info">
                  <h3>Billing Information</h3>
                  <div className="subscription-billing-details">
                    <div className="subscription-billing-item">
                      <span className="subscription-billing-label">Next Billing Date:</span>
                      <span className="subscription-billing-value">{currentSubscription.nextBilling}</span>
                    </div>
                    <div className="subscription-billing-item">
                      <span className="subscription-billing-label">Billing Cycle:</span>
                      <span className="subscription-billing-value capitalize">{currentSubscription.billingCycle}</span>
                    </div>
                    <div className="subscription-billing-item">
                      <span className="subscription-billing-label">Payment Method:</span>
                      <span className="subscription-billing-value">**** **** **** 1234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Available Plans Tab */}
          {activeTab === 'plans' && (
            <div className="subscription-tab-content">
              <div className="subscription-plans-grid">
                {plans.map(plan => (
                  <div key={plan.id} className={`subscription-plan-card ${plan.popular ? 'popular' : ''} ${plan.id === 'premium' ? 'current' : ''}`}>
                    {plan.popular && (
                      <div className="subscription-popular-badge">
                        <FaFire />
                        Most Popular
                      </div>
                    )}
                    {plan.id === 'premium' && (
                      <div className="subscription-current-badge">
                        <FaCheck />
                        Current Plan
                      </div>
                    )}
                    
                    <div className="subscription-plan-header">
                      <div className="subscription-plan-icon">
                        {plan.icon}
                      </div>
                      <div className="subscription-plan-info">
                        <h3 className="subscription-plan-name">{plan.name}</h3>
                        <p className="subscription-plan-description">{plan.description}</p>
                        <p className="subscription-plan-price">
                          {plan.price}
                          <span className="subscription-plan-period">/{plan.period}</span>
                        </p>
                      </div>
                    </div>

                    <div className="subscription-plan-features">
                      <h4>Features:</h4>
                      <ul className="subscription-features-list">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="subscription-feature-item">
                            <FaCheck className="subscription-feature-check" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {plan.limitations.length > 0 && (
                        <>
                          <h4>Limitations:</h4>
                          <ul className="subscription-limitations-list">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="subscription-limitation-item">
                                <FaTimes className="subscription-limitation-cross" />
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="subscription-plan-actions">
                      {plan.id === 'premium' ? (
                        <button className="subscription-action-btn current" disabled>
                          <FaCheck />
                          Current Plan
                        </button>
                      ) : (
                        <button 
                          className={`subscription-action-btn ${plan.id === 'basic' ? 'downgrade' : 'upgrade'}`}
                          onClick={() => handleUpgrade(plan.id)}
                        >
                          {plan.id === 'basic' ? (
                            <>
                              <FaArrowRight />
                              Downgrade
                            </>
                          ) : (
                            <>
                              <FaRocket />
                              Upgrade
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing History Tab */}
          {activeTab === 'billing' && (
            <div className="subscription-tab-content">
              <div className="subscription-billing-section">
                <div className="subscription-section-header">
                  <h3>Billing History</h3>
                  <button className="subscription-download-btn">
                    <FaDownload />
                    Download All Invoices
                  </button>
                </div>
                
                <div className="subscription-billing-table">
                  <div className="subscription-table-header">
                    <div className="subscription-table-cell">Date</div>
                    <div className="subscription-table-cell">Amount</div>
                    <div className="subscription-table-cell">Status</div>
                    <div className="subscription-table-cell">Invoice</div>
                    <div className="subscription-table-cell">Action</div>
                  </div>
                  
                  {billingHistory.map(bill => (
                    <div key={bill.id} className="subscription-table-row">
                      <div className="subscription-table-cell">
                        <FaCalendarAlt className="subscription-table-icon" />
                        {bill.date}
                      </div>
                      <div className="subscription-table-cell">
                        <span className="subscription-amount">{bill.amount}</span>
                      </div>
                      <div className="subscription-table-cell">
                        <span className={`subscription-status-badge ${bill.status.toLowerCase()}`}>
                          <FaCheck />
                          {bill.status}
                        </span>
                      </div>
                      <div className="subscription-table-cell">
                        <span className="subscription-invoice">{bill.invoice}</span>
                      </div>
                      <div className="subscription-table-cell">
                        <button className="subscription-download-invoice-btn">
                          <FaDownload />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Usage & Limits Tab */}
          {activeTab === 'usage' && (
            <div className="subscription-tab-content">
              <div className="subscription-usage-section">
                <h3>Usage & Limits</h3>
                <p className="subscription-usage-description">
                  Monitor your current usage against your plan limits
                </p>
                
                <div className="subscription-usage-grid">
                  <div className="subscription-usage-card">
                    <div className="subscription-usage-header">
                      <FaCar className="subscription-usage-icon" />
                      <h4>Car Listings</h4>
                    </div>
                    <div className="subscription-usage-progress">
                      <div className="subscription-usage-bar">
                        <div 
                          className="subscription-usage-fill"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div className="subscription-usage-text">
                        <span className="subscription-usage-current">{currentSubscription.usage.listings.used}</span>
                        <span className="subscription-usage-separator">/</span>
                        <span className="subscription-usage-limit">{currentSubscription.usage.listings.limit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="subscription-usage-card">
                    <div className="subscription-usage-header">
                      <FaUpload className="subscription-usage-icon" />
                      <h4>Storage</h4>
                    </div>
                    <div className="subscription-usage-progress">
                      <div className="subscription-usage-bar">
                        <div 
                          className="subscription-usage-fill"
                          style={{ width: '23%' }}
                        ></div>
                      </div>
                      <div className="subscription-usage-text">
                        <span className="subscription-usage-current">{currentSubscription.usage.storage.used}</span>
                        <span className="subscription-usage-separator">/</span>
                        <span className="subscription-usage-limit">{currentSubscription.usage.storage.limit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="subscription-usage-card">
                    <div className="subscription-usage-header">
                      <FaChartLine className="subscription-usage-icon" />
                      <h4>API Calls</h4>
                    </div>
                    <div className="subscription-usage-progress">
                      <div className="subscription-usage-bar">
                        <div 
                          className="subscription-usage-fill"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="subscription-usage-text">
                        <span className="subscription-usage-current">{currentSubscription.usage.apiCalls.used.toLocaleString()}</span>
                        <span className="subscription-usage-separator">/</span>
                        <span className="subscription-usage-limit">{currentSubscription.usage.apiCalls.limit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subscription-usage-info">
                  <div className="subscription-info-card">
                    <FaInfoCircle className="subscription-info-icon" />
                    <div>
                      <h4>Usage Reset</h4>
                      <p>Your usage limits reset on your next billing date: {currentSubscription.nextBilling}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
