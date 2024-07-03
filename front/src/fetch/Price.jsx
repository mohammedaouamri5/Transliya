export const Price = (distance, id_car_type, setPrice) => {
  switch (id_car_type) {
    case 1:
      if (distance > 0 && distance <= 100) {
        setPrice(distance * 510);
      } else if (distance > 100 && distance <= 200) {
        setPrice(distance * 600);
      } else if (distance > 200 && distance <= 400) {
        setPrice(distance * 500);
      } else if (distance > 400 && distance <= 600) {
        setPrice(distance * 300);
      } else if (distance > 600 && distance <= 800) {
        setPrice(distance * 400);
      }
      break;
    case 4:
      if (distance > 0 && distance <= 100) {
        setPrice(distance * 1400);
      } else if (distance > 100 && distance <= 200) {
        setPrice(distance * 700);
      } else if (distance > 200 && distance <= 400) {
        setPrice(distance * 550);
      } else if (distance > 400 && distance <= 600) {
        setPrice(distance * 500);
      } else if (distance > 600 && distance <= 800) {
        setPrice(distance * 500);
      }
      break;
    case 5:
      if (distance > 0 && distance <= 100) {
        setPrice(distance * 1600);
      } else if (distance > 100 && distance <= 200) {
        setPrice(distance * 850);
      } else if (distance > 200 && distance <= 400) {
        setPrice(distance * 700);
      } else if (distance > 400 && distance <= 600) {
        setPrice(distance * 550);
      } else if (distance > 600 && distance <= 800) {
        setPrice(distance * 500);
      }
      break;
    case 2:
      if (distance > 0 && distance <= 100) {
        setPrice(distance * 2000);
      } else if (distance > 100 && distance <= 200) {
        setPrice(distance * 1000);
      } else if (distance > 200 && distance <= 400) {
        setPrice(distance * 800);
      } else if (distance > 400 && distance <= 600) {
        setPrice(distance * 700);
      } else if (distance > 600 && distance <= 800) {
        setPrice(distance * 650);
      }
      break;
    case 3:
      if (distance > 0 && distance <= 100) {
        setPrice(distance * 3100);
      } else if (distance > 100 && distance <= 200) {
        setPrice(distance * 1400);
      } else if (distance > 200 && distance <= 400) {
        setPrice(distance * 1050);
      } else if (distance > 400 && distance <= 600) {
        setPrice(distance * 1000);
      } else if (distance > 600 && distance <= 800) {
        setPrice(distance * 950);
      } else if (distance > 800 && distance <= 2000) {
        setPrice(distance * 1000);
      }
      break;
    default:
      break;
  }
};

export const RentPrice = (days, months, setPrice) => {
  if (months === 0 && days > 0) {
    setPrice(days * 17000);
  } else if (months > 0 && days - months * 30 > 0) {
    setPrice(months * 300000 + (days - months * 30) * 17000);
  } else if (months > 0 && days === 0) {
    setPrice(months * 300000);
  }
};
