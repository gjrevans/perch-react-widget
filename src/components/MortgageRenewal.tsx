import React, { useEffect, useRef } from "react";

interface MortgageRenewalProps {
  title?: string;
  content?: React.ReactNode;
}

const MortgageRenewal: React.FC<MortgageRenewalProps> = ({ title, content }) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  // Set the widget ID for the Perch widget
  const widgetId = "tun3yWes";
  const scriptSrc = "https://embeds.myperch.io/assets/perch-embed-widget.js"; // Production URL for Perch widget script

  // Function to dispatch the custom Perch widget initialization event
  const dispatchPerchWidgetInit = () => {
    const event = new CustomEvent("perch-widget:init", {
      detail: {
        perchWidgetId: widgetId,
      },
    });
    window.dispatchEvent(event);
    console.log("Perch widget initialization event dispatched.");
  };

  useEffect(() => {
    // Check if the script has already been added to the document
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      // Dynamically load the Perch script after the component mounts
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;

      script.onload = () => {
        console.log("Perch script loaded successfully.");
        dispatchPerchWidgetInit();
      };

      script.onerror = () => console.error("Error loading Perch script.");

      document.body.appendChild(script);
      console.log("Perch script appended to the document.");
    } else {
      // If the script already exists, only initialize the widget without adding the script again
      console.log("Perch script already exists. Initializing widget directly.");
      dispatchPerchWidgetInit();
    }
  }, [scriptSrc, widgetId]);

  return (
    <div>
      <div ref={widgetRef} className="perch-widget" widget-id={widgetId}>
        {/* Replace the inner content with custom loader */}
        <div className="perch-widget-loading-indicator" style={{ textAlign: "center" }}>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default MortgageRenewal;
