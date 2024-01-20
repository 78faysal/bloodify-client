const FAQ = () => {
  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-5">FAQs</h2>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          FAQ: Who can donate blood?
        </div>
        <div className="collapse-content">
          <p>
            {" "}
            Answer: Most healthy adults between the ages of 18 and 65, weighing
            at least 110 pounds, and not having certain medical conditions can
            donate blood. However, specific eligibility criteria may vary by
            location, so it is best to check with your local blood donation
            center.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          FAQ: How often can I donate blood?
        </div>
        <div className="collapse-content">
          <p>
            Answer: In many countries, whole blood donation is typically allowed
            every 8 weeks (56 days). For platelet donation, it may be possible
            to donate more frequently. Donors are encouraged to follow the
            guidelines provided by their local blood donation center.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          FAQ: Is blood donation safe?
        </div>
        <div className="collapse-content">
          <p>
            Answer: Yes, blood donation is safe. All equipment used is sterile
            and disposable, and the process is conducted by trained
            professionals. The health of the donor is a top priority, and strict
            safety measures are in place to ensure a secure and hygienic
            environment.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          FAQ: What happens during a blood donation?
        </div>
        <div className="collapse-content">
          <p>
            Answer: The blood donation process typically involves registration,
            a brief health check, and the donation itself, which usually takes
            about 10-15 minutes. After donation, donors are encouraged to rest
            and have refreshments. The entire process is designed to be
            efficient and comfortable.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          FAQ: Can I donate blood if I have recently traveled to certain
          regions?
        </div>
        <div className="collapse-content">
          <p>
            Answer: Travel to certain regions may temporarily affect blood
            donation eligibility due to concerns about infectious diseases. It
            is essential to inform the blood donation center staff about recent
            travel during the screening process. They will provide guidance
            based on current guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
