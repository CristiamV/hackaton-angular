import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { CampaignCard } from '../components/campaign-card/campaign-card';
import { ResourceCard } from '../components/resource-card/resource-card';
import { TransferModal } from '../components/transfer-modal/transfer-modal';

@Component({
  selector: 'app-dashboard-page',
  imports: [NgStyle, NgClass, ResourceCard, CampaignCard, TransferModal],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  isTransferModalOpen = false;
  isWalletConnected = false;
  selectedCampaign: string | null = null;

  // Sustituye por rutas a tus imágenes en /assets
  backgroundImage = 'assets/japanese-landscape-bg.jpg';
  daimyoMon = 'assets/daimyo-mon.png';
  landIcon = 'assets/land-icon.png';
  soldiersIcon = 'assets/soldiers-icon.png';
  riceIcon = 'assets/rice-icon.png';

  mockTransactions = [
    { date: '2024-11-10', action: 'Enviaste 100 🌾 a Daimyō Satoshi' },
    { date: '2024-11-09', action: 'Recibiste 50 ⚔️ de Daimyō Tokugawa' },
    { date: '2024-11-08', action: 'Enviaste 20 🏞️ a Daimyō Oda' },
  ];

  campaigns = [
    {
      title: 'Defensa del Paso de Sekigahara',
      targetSoldiers: 5000,
      currentSoldiers: 3200,
      targetRice: 10000,
      currentRice: 6200,
      deadline: '2024-12-15',
    },
    {
      title: 'Refuerzo de la Muralla del Norte',
      targetSoldiers: 3000,
      currentSoldiers: 1500,
      targetRice: 8000,
      currentRice: 4300,
      deadline: '2025-01-10',
    },
  ];

  scrollToCampaigns() {
    const el = document.getElementById('campaigns-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  handleCampaignContribute(campaignTitle: string) {
    this.selectedCampaign = campaignTitle;
    this.isTransferModalOpen = true;
  }

  handleTransferModalChange(open: boolean) {
    this.isTransferModalOpen = open;
    if (!open) {
      this.selectedCampaign = null;
    }
  }

  toggleWallet() {
    this.isWalletConnected = !this.isWalletConnected;
  }
}
