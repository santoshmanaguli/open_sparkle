"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

type Step = "personal" | "address" | "plan" | "customize";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  username: string;
  password: string;
}

interface AddressDetails {
  websiteAddress: string;
  streetAddress: string;
  city: string;
  townVillage: string;
  country: string;
  state: string;
  postalCode: string;
  gstNo: string;
  panNo: string;
  aadharNo: string;
}

interface PlanDetails {
  planId: string;
  users: number;
}

interface CustomizeDetails {
  organizationName: string;
  organizationDetails: string;
  currency: string;
  clientType: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [loading, setLoading] = useState(false);

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
  });

  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    websiteAddress: "",
    streetAddress: "",
    city: "",
    townVillage: "",
    country: "India",
    state: "Maharashtra",
    postalCode: "",
    gstNo: "",
    panNo: "",
    aadharNo: "",
  });

  const [planDetails, setPlanDetails] = useState<PlanDetails>({
    planId: "",
    users: 3,
  });

  const [customizeDetails, setCustomizeDetails] = useState<CustomizeDetails>({
    organizationName: "",
    organizationDetails: "",
    currency: "Rupee",
    clientType: "Retailer",
  });

  const steps: { id: Step; label: string; number: number }[] = [
    { id: "personal", label: "Personal", number: 1 },
    { id: "address", label: "Address", number: 2 },
    { id: "plan", label: "Plan", number: 3 },
    { id: "customize", label: "Customize", number: 4 },
  ];

  const getStepIndex = (step: Step) => steps.findIndex((s) => s.id === step);
  const currentStepIndex = getStepIndex(currentStep);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/client-onboarding/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            personalDetails,
            addressDetails,
            planDetails,
            customizeDetails,
          }),
        }
      );

      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-[52px] px-4 bg-white border border-[#d2d2d7] rounded-xl text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all";
  const selectClass =
    "w-full h-[52px] px-4 bg-white border border-[#d2d2d7] rounded-xl text-[17px] text-[#1d1d1f] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2386868b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:24px] bg-[right_12px_center] bg-no-repeat";
  const labelClass = "block text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2";

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Sparkle
          </span>
          <button
            onClick={() => router.push("/login")}
            className="text-[14px] text-[#0071e3] hover:underline"
          >
            Already have an account?
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#d2d2d7]/50 py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-medium transition-all ${
                        isCompleted
                          ? "bg-[#34c759] text-white"
                          : isCurrent
                          ? "bg-[#0071e3] text-white"
                          : "bg-[#e8e8ed] text-[#86868b]"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                    </div>
                    <span
                      className={`text-[14px] font-medium hidden sm:block ${
                        isCurrent ? "text-[#1d1d1f]" : "text-[#86868b]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-[2px] mx-2 sm:mx-4 ${
                        isCompleted ? "bg-[#34c759]" : "bg-[#e8e8ed]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Step Title */}
          <div className="text-center mb-10">
            <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#1d1d1f] tracking-tight">
              {currentStep === "personal" && "Let's get started"}
              {currentStep === "address" && "Where are you located?"}
              {currentStep === "plan" && "Choose your plan"}
              {currentStep === "customize" && "Final touches"}
            </h1>
            <p className="text-[17px] text-[#86868b] mt-3">
              {currentStep === "personal" && "Tell us about yourself"}
              {currentStep === "address" && "Enter your business address"}
              {currentStep === "plan" && "Select the plan that fits your needs"}
              {currentStep === "customize" && "Personalize your workspace"}
            </p>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-2xl border border-[#d2d2d7]/50 p-8 shadow-sm">
            {/* Personal Details Step */}
            {currentStep === "personal" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    value={personalDetails.firstName}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, firstName: e.target.value })
                    }
                    className={inputClass}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    value={personalDetails.lastName}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, lastName: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className={labelClass}>Mobile *</label>
                  <input
                    type="tel"
                    value={personalDetails.mobile}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, mobile: e.target.value })
                    }
                    className={inputClass}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, email: e.target.value })
                    }
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className={labelClass}>Username *</label>
                  <input
                    type="text"
                    value={personalDetails.username}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, username: e.target.value })
                    }
                    className={inputClass}
                    placeholder="johndoe"
                  />
                </div>
                <div>
                  <label className={labelClass}>Password *</label>
                  <input
                    type="password"
                    value={personalDetails.password}
                    onChange={(e) =>
                      setPersonalDetails({ ...personalDetails, password: e.target.value })
                    }
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Address Details Step */}
            {currentStep === "address" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Street Address *</label>
                  <input
                    type="text"
                    value={addressDetails.streetAddress}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, streetAddress: e.target.value })
                    }
                    className={inputClass}
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    type="text"
                    value={addressDetails.city}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, city: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <select
                    value={addressDetails.state}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, state: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <select
                    value={addressDetails.country}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, country: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Postal Code</label>
                  <input
                    type="text"
                    value={addressDetails.postalCode}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, postalCode: e.target.value })
                    }
                    className={inputClass}
                    placeholder="400001"
                  />
                </div>
                <div>
                  <label className={labelClass}>GST Number</label>
                  <input
                    type="text"
                    value={addressDetails.gstNo}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, gstNo: e.target.value })
                    }
                    className={inputClass}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
                <div>
                  <label className={labelClass}>PAN Number</label>
                  <input
                    type="text"
                    value={addressDetails.panNo}
                    onChange={(e) =>
                      setAddressDetails({ ...addressDetails, panNo: e.target.value })
                    }
                    className={inputClass}
                    placeholder="AAAAA1234A"
                  />
                </div>
              </div>
            )}

            {/* Select Plan Step */}
            {currentStep === "plan" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "basic",
                    name: "Basic",
                    price: "₹50,000",
                    period: "/month",
                    description: "Perfect for small businesses",
                    features: ["3 Users", "Billing", "Barcoding", "Basic Reports"],
                  },
                  {
                    id: "silver",
                    name: "Silver",
                    price: "₹1,50,000",
                    period: "/month",
                    description: "For growing teams",
                    features: ["5 Users", "Everything in Basic", "Stock Transfer", "Advanced Reports"],
                    popular: true,
                  },
                  {
                    id: "gold",
                    name: "Gold",
                    price: "₹2,00,000",
                    period: "/month",
                    description: "For large enterprises",
                    features: ["7 Users", "Everything in Silver", "Priority Support", "Custom Integrations"],
                  },
                  {
                    id: "rfid",
                    name: "RFID",
                    price: "₹50,000",
                    period: "/month",
                    description: "Third-party RFID access",
                    features: ["1 User", "RFID Dashboard", "API Access", "Real-time Tracking"],
                  },
                ].map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setPlanDetails({ planId: plan.id, users: parseInt(plan.features[0]) })}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                      planDetails.planId === plan.id
                        ? "bg-[#0071e3]/5 border-2 border-[#0071e3]"
                        : "bg-[#f5f5f7] border-2 border-transparent hover:border-[#d2d2d7]"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0071e3] text-white text-[11px] font-medium rounded-full uppercase tracking-wide">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-[20px] font-semibold text-[#1d1d1f]">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-[28px] font-bold text-[#1d1d1f]">{plan.price}</span>
                      <span className="text-[14px] text-[#86868b]">{plan.period}</span>
                    </div>
                    <p className="text-[14px] text-[#86868b] mt-2">{plan.description}</p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-[14px] text-[#1d1d1f]">
                          <Check className="w-4 h-4 text-[#34c759]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {planDetails.planId === plan.id && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-[#0071e3] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Customize Step */}
            {currentStep === "customize" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Organization Name *</label>
                  <input
                    type="text"
                    value={customizeDetails.organizationName}
                    onChange={(e) =>
                      setCustomizeDetails({ ...customizeDetails, organizationName: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Acme Jewellers Pvt Ltd"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Organization Details</label>
                  <input
                    type="text"
                    value={customizeDetails.organizationDetails}
                    onChange={(e) =>
                      setCustomizeDetails({ ...customizeDetails, organizationDetails: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Brief description of your business"
                  />
                </div>
                <div>
                  <label className={labelClass}>Currency *</label>
                  <select
                    value={customizeDetails.currency}
                    onChange={(e) =>
                      setCustomizeDetails({ ...customizeDetails, currency: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="Rupee">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Business Type *</label>
                  <select
                    value={customizeDetails.clientType}
                    onChange={(e) =>
                      setCustomizeDetails({ ...customizeDetails, clientType: e.target.value })
                    }
                    className={selectClass}
                  >
                    <option value="Retailer">Retailer</option>
                    <option value="Wholesaler">Wholesaler</option>
                    <option value="Manufacturer">Manufacturer</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-6 h-[52px] text-[17px] font-medium text-[#0071e3] hover:text-[#0077ed] disabled:text-[#86868b] disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 h-[52px] bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-xl transition-all"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-8 h-[52px] bg-[#34c759] hover:bg-[#30b350] text-white text-[17px] font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Account"}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-[#d2d2d7]/50">
        <div className="max-w-6xl mx-auto text-center text-[12px] text-[#86868b]">
          © 2024 Sparkle ERP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
