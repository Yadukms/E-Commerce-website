export default function Success() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
          ✅ Purchase Successful
        </h1>
  
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Thank you for your purchase!  
          Your order has been placed successfully.
        </p>
  
        <a
          href="/"
          style={{
            padding: "12px 20px",
            background: "#222",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "16px",
          }}
        >
          Go to Home
        </a>
      </div>
    );
  }
  