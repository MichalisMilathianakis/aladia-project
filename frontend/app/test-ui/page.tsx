"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function TestUiPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col items-center bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="w-full max-w-xl space-y-4">
        <Card>
          <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            UI Test
          </h1>
          <div className="space-y-3">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              helperText="We will never share your email."
            />
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          </div>
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Hello from Modal"
        >
          <p>This is a reusable modal component.</p>
        </Modal>
      </div>
    </main>
  );
}
