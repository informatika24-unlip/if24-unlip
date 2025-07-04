interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private isEnabled = true;

  constructor() {
    // Load existing events from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("linkhub_analytics");
      if (stored) {
        try {
          this.events = JSON.parse(stored);
        } catch (error) {
          console.warn("Failed to load analytics data:", error);
        }
      }
    }
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    this.saveToStorage();

    // Log for development
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", analyticsEvent);
    }
  }

  getEvents(limit?: number): AnalyticsEvent[] {
    return limit ? this.events.slice(-limit) : this.events;
  }

  getEventsByType(eventType: string): AnalyticsEvent[] {
    return this.events.filter((event) => event.event === eventType);
  }

  getStats() {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;

    const todayEvents = this.events.filter((event) => now - event.timestamp < dayMs);
    const weekEvents = this.events.filter((event) => now - event.timestamp < weekMs);

    return {
      total: this.events.length,
      today: todayEvents.length,
      thisWeek: weekEvents.length,
      topEvents: this.getTopEvents(),
    };
  }

  private getTopEvents() {
    const eventCounts: Record<string, number> = {};

    this.events.forEach((event) => {
      eventCounts[event.event] = (eventCounts[event.event] || 0) + 1;
    });

    return Object.entries(eventCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([event, count]) => ({ event, count }));
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      try {
        // Keep only last 1000 events to prevent storage bloat
        const eventsToSave = this.events.slice(-1000);
        localStorage.setItem("linkhub_analytics", JSON.stringify(eventsToSave));
      } catch (error) {
        console.warn("Failed to save analytics data:", error);
      }
    }
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  clear() {
    this.events = [];
    this.saveToStorage();
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Predefined event types
export const AnalyticsEvents = {
  PAGE_VIEW: "page_view",
  MEMBER_VIEW: "member_view",
  LINK_CLICK: "link_click",
  SEARCH: "search",
  THEME_TOGGLE: "theme_toggle",
  PHOTO_VIEW: "photo_view",
  SOCIAL_CLICK: "social_click",
} as const;
