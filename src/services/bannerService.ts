const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const BANNER_API = `${API_BASE}/managers/banners`;

//POST BANNER 
export const addBanner = async (banner: FormData): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await fetch(BANNER_API, {
    method: "POST",
    headers: {
       Authorization: `Bearer ${token}`,
    },
    body: banner,
  });

 if (!response.ok) {
    if (response.status === 413) {
      throw new Error("413"); // özel mesaj fırlat
    }

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Bir hata oluştu");
  }

  return response.json();
};

// PUT BANNER
export const updateBanner = async (id: string | number, banner: FormData): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BANNER_API}/${id}`, {
    method: "PUT",
    headers: {
       Authorization: `Bearer ${token}`,
    },
    body: banner,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Banner güncellenemedi.");
  }

  return await response.json();
};

// GET BANNER
export const getBanners = async (): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(BANNER_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Bannerlar alınamadı.");
  }

  return response.json();
};

//PUT Aktif / pasif durum değiştir
export const toggleBannerStatus = async (bannerId: string | number): Promise<any> => {
  const token = localStorage.getItem("token"); 

  const response = await fetch(`${BANNER_API}/${bannerId}/toggle-status`, {
    method: "PUT",
    headers: {
       Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Durum değiştirilemedi.");
  }

  return response.json();
};

// Banner sırasını değiştir
export const updateBannerOrder = async (bannerId: string | number, newOrder: number): Promise<any> => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${BANNER_API}/${bannerId}/order?order=${newOrder}`, {
    method: "PUT",
    headers: {
       Authorization: `Bearer ${token}`,
    },
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Banner sırası güncellenemedi: " + errorText);
  }

  return response.json();
};

//DELETE BANNER
export const deleteBanner = async (bannerId: string | number): Promise<void> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BANNER_API}/${bannerId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Banner silinemedi: " + errorText);
  }
  return;
};

// PUBLİC BANNER
export const getAllPublicBanners = async (): Promise<any> => {
  const response = await fetch(`${API_BASE}/banners/active`);

  if (!response.ok) {
    throw new Error("Bannerlar alınamadı.");
  }

  return response.json();
};

