const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const BRAND_API = `${API_BASE}`;

const getToken = () => localStorage.getItem("token");

// MARKALARI LİSTELEME (PUBLIC)
export const fetchBrands = async (): Promise<any> => {
  const response = await fetch(`${BRAND_API}/brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Markalar alınamadı: ${response.status} ${errorText}`);
  }

  return response.json();
};

// AKTİF MARKALARI LİSTELEME (PUBLIC)
export const fetchActiveBrands = async (): Promise<any> => {
  const response = await fetch(`${BRAND_API}/brands/active`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Aktif markalar alınamadı: ${response.status} ${errorText}`);
  }

  return response.json();
};

// MARKA DETAYLARİNİ GETİR (PUBLIC)
export const getBrandById = async (id: string | number): Promise<any> => {
  const response = await fetch(`${BRAND_API}/brands/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Marka verisi alınamadı");
  }

  return await response.json();
};

// MANAGER: TÜM MARKALARI LİSTELEME
export const fetchBrandsForManager = async (): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Markalar alınamadı: ${response.status} ${errorText}`);
  }

  return response.json();
};

// MANAGER: MARKA EKLEME
export const addBrand = async (formData: FormData): Promise<any> => {
  const token = getToken();

  // formData mı gerçekten?
  if (!(formData instanceof FormData)) {
    throw new Error("Hatalı form verisi! BrandData bekleniyor.");
  }

  // Debug için
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`${BRAND_API}/managers/brands`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Marka eklenemedi.");
  }

  return await response.json();
};

// MANAGER: MARKA GÜNCELLEME
export const updateBrand = async (id: string | number, formData: FormData): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Güncelleme hatası:", errorData);
    throw new Error(errorData.message || "Marka güncellenemedi.");
  }

  return await response.json();
};

// MANAGER: MARKA SİLME
export const deleteBrand = async (id: string | number): Promise<void> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Marka silme işlemi başarısız");
  }
};

// MANAGER: MARKA DURUMU DEĞİŞTİRME (AKTİF/PASİF)
export const toggleBrandStatus = async (id: string | number): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands/${id}/toggle-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Marka durumu değiştirilemedi.");
  }

  return await response.json();
};

// MANAGER: MARKA ARAMA
export const searchBrands = async (name: string): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands/search?name=${encodeURIComponent(name)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Marka arama başarısız");
  }

  return response.json();
};

// MANAGER: DURUMA GÖRE MARKA LİSTELEME
export const getBrandsByStatus = async (status: string): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${BRAND_API}/managers/brands/status/${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Markalar duruma göre alınamadı");
  }

  return response.json();
};

