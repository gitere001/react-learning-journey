const assets = {
	colors: {
	  primary: {
		blue: {
		  DEFAULT: "#3B82F6",
		  hover: "#2563EB",
		  light: "#93C5FD",
		},
		gray: {
		  50: "#F9FAFB",
		  100: "#F3F4F6",
		  200: "#E5E7EB",
		  600: "#4B5563",
		  700: "#374151",
		  900: "#111827",
		},
		green: {
		  100: "#D1FAE5",
		  500: "#22C55E",
		},
		red: {
		  100: "#FEE2E2",
		  500: "#EF4444",
		},
	  },
	},

	typography: {
	  fonts: {
		sans: '"Segoe UI", Roboto, sans-serif',
	  },
	  sizes: {
		h1: "30px",
		h2: "24px",
		body: "16px",
		small: "14px",
	  },
	  weights: {
		normal: "400",
		medium: "500",
		semibold: "600",
		bold: "700",
	  },
	},

	spacing: {
	  2: "8px",
	  3: "12px",
	  4: "16px",
	  6: "24px",
	  8: "32px",
	  12: "48px",
	},

	components: {
	  button: {
		primary: {
		  base: {
			background: "#3B82F6",
			color: "#FFFFFF",
			fontWeight: "500",
			borderRadius: "8px",
			transition: "background-color 0.2s ease-in-out",
		  },
		  hover: {
			background: "#2563EB",
		  },
		  sizes: {
			default: {
			  padding: "12px 24px",
			},
			small: {
			  padding: "8px 16px",
			},
		  },
		},
		secondary: {
		  base: {
			color: "#3B82F6",
			fontWeight: "500",
			transition: "color 0.2s ease-in-out",
		  },
		  hover: {
			color: "#2563EB",
		  },
		},
	  },
	  input: {
		base: {
		  width: "100%",
		  padding: "12px",
		  border: "1px solid #E5E7EB",
		  borderRadius: "8px",
		  outline: "none",
		},
		focus: {
		  borderColor: "#3B82F6",
		  boxShadow: "0 0 0 2px #93C5FD",
		},
		withIcon: {
		  paddingLeft: "48px",
		},
	  },
	  card: {
		base: {
		  background: "#FFFFFF",
		  borderRadius: "16px",
		  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
		  padding: "32px",
		},
	  },
	},

	shadows: {
	  sm: "0px 1px 3px rgba(0, 0, 0, 0.1)",
	  DEFAULT: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	},

	borderRadius: {
	  DEFAULT: "8px",
	  xl: "16px",
	  "2xl": "24px",
	},

	animations: {
	  spin: "animation: spin 1s linear infinite",
	  transition: "transition: all 0.3s ease-in-out",
	},

	icons: {
	  navigation: {
		back: "ArrowLeft",
	  },
	  status: {
		loading: "Loader2",
	  },
	  input: {
		phone: "Phone",
	  },
	},

	layouts: {
	  page: {
		wrapper: {
		  minHeight: "100vh",
		  background: "#F9FAFB",
		},
		container: {
		  maxWidth: "640px",
		  margin: "0 auto",
		  padding: "24px",
		},
	  },
	  center: {
		base: {
		  display: "flex",
		  alignItems: "center",
		  justifyContent: "center",
		},
	  },
	},

	status: {
	  success: {
		background: "#D1FAE5",
		iconColor: "#22C55E",
	  },
	  error: {
		background: "#FEE2E2",
		iconColor: "#EF4444",
	  },
	  processing: {
		iconColor: "#3B82F6",
	  },
	},
  };

  export default assets;
