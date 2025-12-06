const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const ADDRESS_API = `${API_BASE}/addresses`;

//POST ADDRESS
export const createAddress = async (addressData: any): Promise<any> => {
  const token = localStorage.getItem("token");
  

  const response = await fetch(ADDRESS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Adres oluşturulamadı");
  }

  return await response.json();
};

//GET ADDRESS
export const fetchAddresses = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(ADDRESS_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Token gerekiyor
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Adresler getirilemedi");
  }

  return await response.json();
};

//DELETE ADDRESS
export const deleteAddress = async (id: string | number): Promise<boolean> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${ADDRESS_API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Adres silinemedi");
  }

  return true;
};

//GET ID
export const getAddressById = async (id: string | number): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${ADDRESS_API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Adres getirilemedi");
  }

  return await response.json();
};

//PUT ADDRESS
export const updateAddress = async (id: string | number, formData: any): Promise<boolean> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${ADDRESS_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Adres güncellenemedi");
  }
  return true;
};

