export const fadeUp = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  export const fade = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
      },
    },
  };

  export const scaleIn = {
    hidden: {
      opacity: 0,
      scale: .96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: .30,
      },
    },
  };

  export const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: .08,
      },
    },
  };
