/**
 * Optional build-time UI feature flags for white-label forks.
 * The sample repo keeps every flag `false` (full backoffice surface visible).
 *
 * In a product fork, set flags from env or a small config module — do not ship
 * customer-specific names in this template.
 */
export const productFeatures = {
  mirrorEnFromIt: false,
  hideAddBuilding: false,
  hideApartmentsMenu: false,
  hideUserCreateActions: false,
  usersReadOnly: false,
  hideApartmentFilters: false,
  hideBuildingSmartLocks: false,
  hideBuildingOnboarding: false,
  hideBuildingMapSection: false,
  hideAmenityLockFields: false,
  hideAmenityOptions: false,
  hideUtilitiesMenu: false,
  hideTicketApartmentColumn: false,
  hideCommunicationApartmentField: false,
  hideBuildingInstalments: false,
} as const;
