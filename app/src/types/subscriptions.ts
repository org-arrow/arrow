type Service = {
  serviceId: bigint;
  name: string;
  description: string;
  url: string;
  subscribers: bigint;
  subscriptionAmount: bigint;
  subscriptionDuration: bigint;
  isPublic: boolean;
}

type Subscription = {
  serviceId: bigint;
  amount: bigint;
  duration: bigint;
  subscriptionPeriod: bigint;
  lastPaidTime: bigint;
  service: Service;
}
