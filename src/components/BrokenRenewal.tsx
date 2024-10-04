import React, { useEffect } from "react";
// THIS FILE WAS LEFT BROKEN ON PURPOSE
// It initializes the Perch widget multiple times, which causes an error in the widget script
// This can be mitigated by checking if the script has already been added to the document before appending it
// Please see MortgageRenewal.tsx for the correct implementation

interface MortgageRenewalProps {
  title?: string;
  content?: React.ReactNode;
}

const BrokenRenewal: React.FC<MortgageRenewalProps> = ({ title, content }) => {
  useEffect(() => {
    // Set the widget ID for the Perch widget
    const widgetId = "tun3yWes";

    // Dynamically load the Perch script after the component mounts
    const script = document.createElement("script");
    script.src = "https://embeds.myperch.io/assets/perch-embed-widget.js"; // Replace with the actual URL provided by Perch
    script.async = true;

    // Log when the script is appended
    script.onload = () => {
      console.log("Perch script loaded successfully.");

      // Create a custom event that signals the Perch widget to initialize
      const event = new CustomEvent('perch-widget:init', { 
        detail: { 
          perchWidgetId: widgetId 
        }
      });

      // Dispatch the event on the window object
      window.dispatchEvent(event);
    };
    script.onerror = () => console.error("Error loading Perch script.");

    document.body.appendChild(script);
    console.log("Perch script appended to the document.");

    return () => {
      // Clean up by removing the script if the component unmounts
      document.body.removeChild(script);
      console.log("Perch script removed from the document.");
    };
  }, []);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <div class="perch-widget" widget-id="tun3yWes">
            <!-- Replace the inner content with custom loader -->
            <div class="perch-widget-loading-indicator" style="text-align: center;">Loading...</div>
            </div>
          `
        }}
      />
    </div>
  );
};

export default BrokenRenewal;