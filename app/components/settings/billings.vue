<template>
  <div>
    <div class="space-y-16">
      <section class="space-y-8">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- LEFT COLUMN (8 Units) -->
          <div class="lg:col-span-7 space-y-8">
            <!-- Current Plan Card -->
            <section class="bg-[#121214] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
              <div class="flex justify-between items-start">
                <div class="space-y-6">
                  <div>
                    <p class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Current Plan</p>
                    <h1 class="text-3xl font-bold text-white tracking-tight">Pro Enterprise</h1>
                  </div>

                  <div class="space-y-3">
                    <div class="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <Icon name="ph:calendar-blank-bold" size="16" class="text-indigo-500" />
                      Renewal Date: October 24, 2024
                    </div>
                    <div class="flex items-center gap-3 text-xs font-bold text-gray-400">
                      <Icon name="ph:check-circle-fill" size="16" class="text-indigo-500" />
                      Unlimited Team Members
                    </div>
                  </div>

                  <button
                    class="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all active:scale-95">
                    Change Plan
                  </button>
                </div>

                <!-- Price Badge Overlay -->
                <div class="relative">
                  <div
                    class="w-24 h-24 bg-white/[0.03] rounded-full flex flex-col items-center justify-center border border-white/5 shadow-2xl backdrop-blur-sm">
                    <span class="text-2xl font-black text-white">$49<span
                        class="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">/mo</span></span>
                    <span class="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Billed
                      annually</span>
                  </div>
                  <!-- Decorative star-like burst behind price if needed -->
                </div>
              </div>
            </section>

            <!-- Storage Usage Card -->
            <section class="bg-[#121214] border border-white/5 rounded-3xl p-8">
              <div class="flex justify-between items-end mb-8">
                <div>
                  <h2 class="text-lg font-bold text-white mb-1">Storage Usage</h2>
                  <p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Real-time node
                    synchronization data</p>
                </div>
                <div class="text-end">
                  <span class="text-2xl font-bold text-white">2.3 TB</span>
                  <span class="text-xs font-bold text-gray-600 ms-2 uppercase tracking-widest">of 5 TB used</span>
                </div>
              </div>

              <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-10">
                <div
                  class="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 w-[46%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div v-for="stat in storageBreakdown" :key="stat.label"
                  class="bg-white/[0.02] border border-white/[0.05] p-5 rounded-2xl">
                  <p class="text-[10px] font-bold uppercase tracking-widest mb-3" :class="stat.color">{{ stat.label }}
                  </p>
                  <p class="text-xl font-bold text-gray-200">{{ stat.value }}</p>
                </div>
              </div>
            </section>

            <!-- Billing History Card -->
            <section class="bg-[#121214] border border-white/5 rounded-3xl p-8">
              <h2 class="text-lg font-bold text-white mb-8">Billing History</h2>
              <div class="w-full">
                <div
                  class="grid grid-cols-12 px-2 py-3 text-[10px] font-black text-gray-600 uppercase tracking-widest border-b border-white/5">
                  <div class="col-span-2">Date</div>
                  <div class="col-span-5">Description</div>
                  <div class="col-span-2">Amount</div>
                  <div class="col-span-2">Status</div>
                  <div class="col-span-1 text-end">Invoice</div>
                </div>

                <div v-for="inv in invoices" :key="inv.date"
                  class="grid grid-cols-12 px-2 py-5 items-center text-xs font-bold border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                  <div class="col-span-2 text-gray-400">{{ inv.date }}</div>
                  <div class="col-span-5 text-gray-300">{{ inv.description }}</div>
                  <div class="col-span-2 text-gray-200">{{ inv.amount }}</div>
                  <div class="col-span-2">
                    <span
                      class="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-indigo-500/20">
                      {{ inv.status }}
                    </span>
                  </div>
                  <div class="col-span-1 text-end">
                    <button class="p-2 hover:bg-white/5 rounded-lg text-gray-600 hover:text-white transition-colors">
                      <Icon name="ph:download-simple-bold" size="18" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- RIGHT COLUMN (4 Units) -->
          <div class="lg:col-span-5 space-y-8">
            <!-- Payment Methods -->
            <section class="bg-[#121214] border border-white/5 rounded-3xl p-8">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-lg font-bold text-white">Payment Methods</h2>
                <button
                  class="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">
                  <Icon name="ph:plus-circle-bold" size="14" />
                  Add New
                </button>
              </div>

              <div class="space-y-4">
                <div class="bg-[#1c1c1f] border border-white/5 rounded-2xl p-5 flex items-center justify-between group">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-8 bg-black rounded border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      VISA</div>
                    <div>
                      <p class="text-sm font-bold text-gray-200">Visa ending in 4242</p>
                      <p class="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Expiry 12/26 • Default
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <button class="p-2 hover:bg-white/5 rounded-lg text-gray-600 hover:text-white transition-colors">
                      <Icon name="ph:pencil-simple-bold" size="18" />
                    </button>
                    <button class="p-2 hover:bg-white/5 rounded-lg text-gray-600 hover:text-red-400 transition-colors">
                      <Icon name="ph:trash-bold" size="18" />
                    </button>
                  </div>
                </div>

                <!-- Add new dropzone style area -->
                <div
                  class="border-2 border-dashed border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/[0.01] hover:border-white/10 transition-all">
                  <div
                    class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="ph:credit-card-bold" size="20" class="text-gray-600 group-hover:text-indigo-400" />
                  </div>
                  <p class="text-xs font-bold text-gray-400 mb-1">Link new payment method</p>
                  <p class="text-[10px] font-medium text-gray-700">Accepting Credit, Debit, and ACH</p>
                </div>
              </div>
            </section>

            <!-- Tax Information -->
            <section class="bg-[#121214] border border-white/5 rounded-3xl p-8">
              <h2 class="text-lg font-bold text-white mb-8">Tax Information</h2>
              <div class="space-y-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ms-1">Business
                    Name</label>
                  <input v-model="businessName" type="text"
                    class="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 uppercase tracking-widest ms-1">Tax ID / VAT
                    Number</label>
                  <input v-model="taxId" type="text"
                    class="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/30" />
                </div>
                <button
                  class="w-full border border-white/10 hover:bg-white/5 text-gray-300 font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all mt-4">
                  Update Tax Settings
                </button>
              </div>
            </section>

            <!-- Billing Support Card -->
            <section class="bg-[#1c1c1f] border border-white/5 rounded-3xl p-6 flex gap-5 items-start">
              <div
                class="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/10">
                <Icon name="ph:headset-bold" class="text-indigo-400" size="20" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-white mb-1">Need billing help?</h4>
                <p class="text-[11px] text-gray-500 leading-relaxed font-medium mb-3">Our finance team is available 24/7
                  for Enterprise customers to resolve any payment issues.</p>
                <button
                  class="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">Contact
                  Support</button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Invoice, StorageDetail } from '~/types/billings';

const invoices = ref<Invoice[]>([
  { date: 'Oct 01, 2023', description: 'Pro Enterprise - Monthly Subscription', amount: '$49.00', status: 'PAID' },
  { date: 'Sep 01, 2023', description: 'Pro Enterprise - Monthly Subscription', amount: '$49.00', status: 'PAID' },
  { date: 'Aug 01, 2023', description: 'Pro Enterprise - Monthly Subscription', amount: '$49.00', status: 'PAID' },
]);

const storageBreakdown = ref<StorageDetail[]>([
  { label: 'Active Assets', value: '1.8 TB', color: 'text-indigo-400' },
  { label: 'Trash/Storage', value: '412 GB', color: 'text-orange-400' },
  { label: 'System Cache', value: '104 GB', color: 'text-orange-300' },
]);

const businessName = ref('Acme Monolith Corp');
const taxId = ref('US-99120349-X');
</script>